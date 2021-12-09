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
const btnWorld = document.querySelector(".btnWorld");
const btnAsia = document.querySelector(".btnAsia");
const btnAfrica = document.querySelector(".btnAfrica");
const btnAmerica = document.querySelector(".btnAmerica");
const btnEurope = document.querySelector(".btnEurope");
const ctx = document.getElementById("myChart");

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
	let data2 = [];
	const baseURLCovid = "https://corona-api.com/countries";
	if (region !== "world") {
		data.data.forEach((country, index) => {
			axios.get(`${baseURLCovid}/${country.cca2}`).then((response) => {
				regions[region].deaths += response.data.data.latest_data.deaths;
				regions[region].confirmed += response.data.data.latest_data.confirmed;
				regions[region].recovered += response.data.data.latest_data.recovered;
				regions[region].critical += response.data.data.latest_data.critical;
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
		generateChart(regions.world, "bar");
	}
};
const getCountries = async (region) => {
	let data = [];
	let countries;
	const baseURL = "https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/";
	if (region !== "world") {
		countries = await axios.get(baseURL + region);
		getRegionData(countries, region);
	} else {
		getRegionData([], region);
	}
};
const countrySelect = document.querySelector("#country");
const buttonsList = document.querySelectorAll(".btn-container button");
buttonsList.forEach((button) => {
	button.addEventListener("click", () => {
		generateChart(regions[button.getAttribute("data-region")], myChart.config._config.type);
		buttonsList.forEach((btn) => {
			btn.id = "";
		});
		button.id = "selected";
		countrySelect.value = "none";
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
const changeData = async () => {
	const baseURL = "https://corona-api.com/countries/";
	const data = await axios.get(baseURL + countrySelect.value);
	console.log(data);
	generateChart(data.data.data.latest_data, myChart.config._config.type);
	buttonsList.forEach((btn) => {
		btn.id = "";
	});
};
const populateSelect = async () => {
	const baseURLCovid = "https://corona-api.com/countries";
	const countries = await axios.get(baseURLCovid);
	countries.data.data.forEach((country) => {
		countrySelect.innerHTML += `<option value="${country.code}">${country.name}</option>`;
	});
};
populateSelect();
countrySelect.addEventListener("change", changeData);

const chartType = document.querySelector("#chart-type");
chartType.addEventListener("change", () => {
	const data = {
		deaths: myChart.data.datasets[0].data[0],
		confirmed: myChart.data.datasets[0].data[1],
		recovered: myChart.data.datasets[0].data[2],
		critical: myChart.data.datasets[0].data[3],
	};
	generateChart(data, chartType.value);
});
