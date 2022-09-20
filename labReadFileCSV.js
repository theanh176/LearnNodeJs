const needle = require("needle");
const csv = require("csv-parser");
const ps = require("prompt-sync");
const axios = require("axios");
let csvToJson = require("csvtojson");
const prompt = ps();

let Confirmed = [];
let Deaths = [];
let Recovered = [];

const handleFinal = async (start_date, end_date, country) => {
	await readFileCSV(start_date, country);
	await readFileCSV(end_date, country);
};

const readFileCSV = (dateF, country) => {
	const date = dateF;
	const [month, day, year] = date.split("-");
	const dateFinal = [day, month, year].join("-");

	const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${dateFinal}.csv`;
	axios.get(url).then(async (resp) => {
		const results = await csvToJson().fromString(resp.data);
		filterCountry(results, country);
	});
};

function filterCountry(data, country) {
	let sumConfirmed = 0;
	let sumDeaths = 0;
	let sumRecovered = 0;
	for (const result of data) {
		if (result.Country_Region == country) {
			sumConfirmed += Number(result.Confirmed);
			sumDeaths += Number(result.Deaths);
			sumRecovered += Number(result.Recovered);
		} else {
			sumConfirmed += Number(result.Confirmed);
			sumDeaths += Number(result.Deaths);
			sumRecovered += Number(result.Recovered);
		}
	}
	Confirmed.push(sumConfirmed);
	Deaths.push(sumDeaths);
	Recovered.push(sumRecovered);

	// console.log(
	// 	Math.abs(Confirmed[1] - Confirmed[0]),
	// 	Math.abs(Deaths[1] - Deaths[0]),
	// 	Math.abs(Recovered[1] - Recovered[0])
	// );
	if (typeof Confirmed == Number) {
		console.log(
			Confirmed[1] - Confirmed[0],
			Deaths[1] - Deaths[0],
			Recovered[1] - Recovered[0]
		);
	}
}

// let date_start = prompt();
// let date_end = prompt();
// let country = prompt();

handleFinal("01-01-2021", "02-01-2021", "Chile");
