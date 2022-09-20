const prompt = require("prompt");

const properties = [
	{
		name: "calculation",
		validator: /^[-+/*]+$/,
		warning: "Please re-enter",
	},
	{
		name: "a",
		validator: /^[-0-9][0-9]*$/,
		warning: "Please re-enter",
	},
	{
		name: "b",
		validator: /^[-0-9][0-9]*$/,
		warning: "Please re-enter",
	},
];

prompt.start();

prompt.get(properties, function (err, result) {
	if (err) {
		return onErr(err);
	}
	if (result.calculation == "+")
		console.log(Number(result.a) + Number(result.b));
	if (result.calculation == "-")
		console.log(Number(result.a) - Number(result.b));
	if (result.calculation == "*")
		console.log(Number(result.a) * Number(result.b));
	if (result.calculation == "/")
		console.log(Number(result.a) / Number(result.b));
});

function onErr(err) {
	console.log(err);
	return 1;
}
