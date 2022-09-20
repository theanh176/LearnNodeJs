const ps = require("prompt-sync");
const axios = require("axios");
let csvToJson = require("csvtojson");
const process = require("process");

let date_start = process.argv[2];
let date_end = process.argv[3];
let country = process.argv[4];

let Confirmed = [];
let Deaths = [];
let Recovered = [];

const handleFinal = async (start_date, end_date, country) => {
	await readFileCSV(start_date, country);
	await readFileCSV(end_date, country);
	console.log(
		Confirmed[1] - Confirmed[0],
		Deaths[1] - Deaths[0],
		Recovered[1] - Recovered[0]
	);
};

const readFileCSV = async (dateF, country) => {
	const date = dateF;
	const [month, day, year] = date.split("-");
	const dateFinal = [day, month, year].join("-");

	const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${dateFinal}.csv`;
	const resp = await axios.get(url);
	const results = await csvToJson().fromString(resp.data);
	filterCountry(
		country
			? results.filter(
					(data) =>
						data.Country_Region.toLowerCase() ===
						country.toLowerCase().replace(/_/g, " ")
			  )
			: results
	);
};

function filterCountry(data) {
	let sumConfirmed = 0;
	let sumDeaths = 0;
	let sumRecovered = 0;
	for (const result of data) {
		sumConfirmed += Number(result.Confirmed);
		sumDeaths += Number(result.Deaths);
		sumRecovered += Number(result.Recovered);
	}
	Confirmed.push(sumConfirmed);
	Deaths.push(sumDeaths);
	Recovered.push(sumRecovered);
}

handleFinal(date_start, date_end, country);
