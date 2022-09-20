var http = require("http");

const myGroupMember = ["19110440", "19110441"];

const mygroup = [
	{
		id: "19110324",
		name: "Trần Lưu Thế Anh",
	},
];

const routes = [
	{
		path: "/message",
		handle: (req, res) => {
			if (req.method === "GET") {
				const id = req.url.replace("/message", "").replace("/", "");
				if (id) {
					const student = mygroup.find((st) => st.id === id);
					if (student) {
						res.setHeader(
							"content-type",
							"text/html; charset=utf-8"
						);
						res.end(
							`<html>
                            <body>
                                <ul>
                                    <li>${student.name}</li>
                                </ul>
                            </body>
                        </html>`
						);
					} else {
						res.end("Not valid");
					}
				} else {
					res.setHeader("content-type", "text/html; charset=utf-8");

					res.end(
						`<html>
                            <body>
                                <ul>
                                    ${mygroup
										.map((st) => `<li>${st.name}</li>`)
										.join("")}
                                </ul>
                            </body>
                        </html>`
					);
				}
			} else res.end("Not valid!");
		},
	},
	{
		path: "/19110324",
		handle: (req, res) => {
			switch (req.method) {
				case "GET":
					const id = req.url.replace("/19110324/", "");

					const info = mygroup.find((student) => student.id === id);
					if (info) res.end(JSON.stringify(info));
					else res.end(JSON.stringify({ error: "not valid" }));
					break;

				case "POST":
					var item = {};
					req.on("data", (chunk) => {
						item = JSON.parse(chunk);
					});
					req.on("end", () => {
						// Item hợp lệ
						if (item.id && item.name)
							if (
								myGroupMember.find((id) => id === item.id) && // Có trong nhóm đề tài cuối kì
								!mygroup.find((st) => st.id === item.id) // Chưa có trong mygroup
							) {
								mygroup.push(item);
								res.end();
							} else res.end("Not valid");
						else res.end("Not valid");
					});
					break;

				default:
					res.end("Not valid");
			}
		},
	},
	{
		path: "/",
		handle: (req, res) => {
			res.end(JSON.stringify(mygroup));
		},
	},
];

const server = http.createServer(function (req, res) {
	res.setHeader("content-type", "application/json; charset=utf-8");

	const url = req.url;
	routes.find((route) => url.startsWith(route.path))?.handle(req, res);
});

server.listen(5000, () => {
	console.log("Server is listening on port 5000");
});
