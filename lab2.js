const prompt = require("prompt");
const fs = require("fs");

const properties = [
	{
		name: "fileName",
	},
];

prompt.start();

prompt.get(properties, function (err, result) {
	if (err) {
		return onErr(err);
	}

	fs.readFile(result.fileName, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	});
});

function onErr(err) {
	console.log(err);
	return 1;
}
