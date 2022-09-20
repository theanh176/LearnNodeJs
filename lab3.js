var events = require("events");
var util = require("util");

function Sinhvien(name, mssv, monHoc = "") {
	this.name = name;
	this.mssv = mssv;
	this.monHoc = monHoc;
	this.hoc = (monHoc) => {
		console.log(`${monHoc}`);
		this.monHoc = monHoc;
	};
}
util.inherits(Sinhvien, events.EventEmitter);
const IT = new Sinhvien("Trần Lưu Thế Anh", "19110324");
console.log(IT);
IT.on("hoc", (monHoc) => {
	IT.hoc(monHoc);
});
IT.emit("hoc", "SQL");
console.log(IT);
