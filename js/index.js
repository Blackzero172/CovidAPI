const regions = {
	world: {
		deaths: 0,
		confirmed: 0,
		recovered: 0,
		critical: 0,
	},
	africa: {
		deaths: 0,
		confirmed: 0,
		recovered: 0,
		critical: 0,
	},
	americas: {
		deaths: 0,
		confirmed: 0,
		recovered: 0,
		critical: 0,
	},
	europe: {
		deaths: 0,
		confirmed: 0,
		recovered: 0,
		critical: 0,
	},
	asia: {
		deaths: 0,
		confirmed: 0,
		recovered: 0,
		critical: 0,
	},
};
const currentCountry = {
	deaths: 0,
	confirmed: 0,
	recovered: 0,
	critical: 0,
};
const searchCountries = [];
const ctx = document.getElementById("myChart");
const countrySelect = document.querySelector("#country");
const buttonsList = document.querySelectorAll(".btn-container button");
let myChart = "";
Chart.defaults.font.family = "Readex Pro";
const generateChart = (resData, type) => {
	const data = [resData.deaths, resData.confirmed, resData.recovered, resData.critical];
	if (myChart !== "") myChart.destroy();
	myChart = new Chart(ctx, {
		type: type,
		data: {
			labels: ["Deaths", "Confirmed", "Recovered", "Critical"],
			datasets: [
				{
					label: "# of Cases",
					data: data,
					backgroundColor: ["#3338", "#fb58", "#2f28", "#f558"],
					borderColor: ["#333", "#fb5", "#2f2", "#f55"],
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			maintainAspectRatio: false,
		},
	});

	if (type === "pie" || type === "doughnut") {
		myChart.options.scales.y.display = false;
		myChart.update();
	}
};
const getRegionData = async (data, region) => {
	const baseURLCovid = "https://corona-api.com/countries";
	if (window.localStorage.getItem(region) === null) {
		if (region !== "world") {
			data.data.forEach((country, index) => {
				axios.get(`${baseURLCovid}/${country.cca2}`).then((response) => {
					regions[region].deaths += response.data.data.latest_data.deaths;
					regions[region].confirmed += response.data.data.latest_data.confirmed;
					regions[region].recovered += response.data.data.latest_data.recovered;
					regions[region].critical += response.data.data.latest_data.critical;
					if (index >= data.data.length - 1) saveToStorage(region);
				});
			});
		} else {
			countries = await axios.get(baseURLCovid, [
				{
					headers: "application/json",
				},
			]);
			countries.data.data.forEach((country) => {
				regions.world.deaths += country.latest_data.deaths;
				regions.world.confirmed += country.latest_data.confirmed;
				regions.world.recovered += country.latest_data.recovered;
				regions.world.critical += country.latest_data.critical;
			});
		}
	} else {
		regions[region] = JSON.parse(window.localStorage.getItem(region));
	}
	generateChart(regions.world, "bar");
};
const saveToStorage = (region) => {
	window.localStorage.setItem(region, JSON.stringify(regions[region]));
};
const getCountries = async (region) => {
	let countries;
	const baseURL = "https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/";
	if (region !== "world") {
		countries = await axios.get(baseURL + region);
		getRegionData(countries, region);
	} else {
		getRegionData([], region);
	}
};
buttonsList.forEach((button) => {
	button.addEventListener("click", () => {
		generateChart(regions[button.getAttribute("data-region")], myChart.config._config.type);
		buttonsList.forEach((btn) => {
			btn.id = "";
		});
		button.id = "selected";
		searchBar.value = "";
	});
});
window.addEventListener("load", () => {
	getCountries("world").catch((err) => {
		console.error(err);
	});
	getCountries("asia").catch((err) => {
		console.error(err);
	});
	getCountries("africa").catch((err) => {
		console.error(err);
	});
	getCountries("europe").catch((err) => {
		console.error(err);
	});
	getCountries("americas").catch((err) => {
		console.error(err);
	});
});
const searchBar = document.querySelector(".search-input");
const chartType = document.querySelector("#chart-type");
let timerId;
const resultContainer = document.querySelector(".results-container");
const changeData = (e) => {
	const country = searchCountries.find((country) => {
		return country.name === e.target.innerText;
	});
	searchBar.value = e.target.innerText;
	resultContainer.innerHTML = "";
	resultContainer.classList.remove("border-class");
	generateChart(country.latest_data, myChart.config._config.type);
	buttonsList.forEach((btn) => {
		btn.id = "";
	});
};
const populateArray = async () => {
	const baseURLCovid = "https://corona-api.com/countries";
	const countries = await axios.get(baseURLCovid);
	countries.data.data.forEach((country) => {
		searchCountries.push(country);
	});
};
populateArray();
chartType.addEventListener("change", () => {
	const data = {
		deaths: myChart.data.datasets[0].data[0],
		confirmed: myChart.data.datasets[0].data[1],
		recovered: myChart.data.datasets[0].data[2],
		critical: myChart.data.datasets[0].data[3],
	};
	generateChart(data, chartType.value);
});

const search = (e) => {
	resultContainer.innerHTML = "";
	resultContainer.classList.remove("border-class");

	const filteredCountries = searchCountries.filter((inStr) => {
		return inStr.name.toLowerCase().includes(searchBar.value.toLowerCase());
	});
	clearTimeout(timerId);
	if (e.target.value !== "")
		timerId = setTimeout(() => {
			displayResults(filteredCountries);
		}, 1000);
};
const displayResults = (countriesList) => {
	countriesList.forEach((country) => {
		const button = document.createElement("button");
		button.type = "button";
		button.innerText = country.name;
		resultContainer.append(button);
		button.addEventListener("click", changeData);
	});
	resultContainer.classList.add("border-class");
	if (countriesList.length === 0) {
		resultContainer.innerText = "Sorry couldn't find any countries with this name,please try again";
	}
};
searchBar.addEventListener("input", search);
searchBar.addEventListener("focusout", () => {
	setTimeout(() => {
		resultContainer.innerHTML = "";
		resultContainer.classList.remove("border-class");
	}, 500);
});
searchBar.addEventListener("focus", search);
