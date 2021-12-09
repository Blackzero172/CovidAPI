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
	america: {},
	europe: {},
	asia: {},
};

const btnWorld = document.querySelector(".btnWorld");
const btnAsia = document.querySelector(".btnAsia");
const btnAfrica = document.querySelector(".btnAfrica");
const btnAmerica = document.querySelector(".btnAmerica");
const btnEurope = document.querySelector(".btnEurope");
const ctx = document.getElementById("myChart");

let myChart = "";

const generateChart = (data) => {
	if (myChart !== "") myChart.destroy();
	myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["Deaths", "Confirmed", "Recovered", "Critical"],
			datasets: [
				{
					label: "# of Cases",
					data: data,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
					],
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
		},
	});
};

const getCountries = async (region) => {
	let data = [];
	let countries;
	// https://corona-api.com/countries/IL
	if (regions[region].deaths === 0) {
		console.log("Called API");
		countries = await axios.get("https://restcountries.herokuapp.com/api/v1/region/asia", [
			{
				headers: "access-control-allow-origin",
			},
		]);
		// countries.data.data.forEach((country) => {
		// 	regions[region].deaths += country.latest_data.deaths;
		// 	regions[region].confirmed += country.latest_data.confirmed;
		// 	regions[region].recovered += country.latest_data.recovered;
		// 	regions[region].criticial += country.latest_data.criticial;
		// });
	}
};
btnWorld.addEventListener("click", () => {
	getCountries("world").catch((err) => {
		console.error(err.response);
	});
});

btnAfrica.addEventListener("click", () => {
	getCountries("africa").catch((err) => {
		console.error(err);
	});
});
