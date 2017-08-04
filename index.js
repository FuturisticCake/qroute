#! /usr/bin/env node

const net = require("net");

const args = process.argv.slice(2);

if (args.length !== 2) {
	console.log("Command usage: qroute <listen> <forward-to>");
	process.exit(1);
	return;
}

const addressRegex = /([A-Za-z0-9\.\-]+):([0-9]+)/;

var parsedOptions = {
	"listen": addressRegex.exec(args[0]),
	"forwardTo": addressRegex.exec(args[1])
};

if (parsedOptions.listen === null || parsedOptions.forwardTo === null) {
	console.log("Invalid address(es). Expected format: host:port");
	process.exit(1);
	return;
}

var server = net.createServer((s) => {
	var outbound = net.createConnection({
		"host": parsedOptions.forwardTo[1],
		"port": parsedOptions.forwardTo[2]
	});

	outbound.on("error", (err) => {
		console.error("Outbound (forward-to) connection has experienced an error. " + err);
	});

	s.pipe(outbound);
	outbound.pipe(s);
});

server.on("error", (err) => {
	if (err.code === "EADDRINUSE") {
		console.log("Server start failed. Address already in use!");
		process.exit(1);
		return;
	}
	if (err.code === "EACCES") {
		console.log("Access denied to host on " + parsedOptions.listen[1] + ":" + parsedOptions.listen[2] + ".");
		process.exit(1);
		return;
	}
	console.error("Server experienced an error: " + err);
});

server.listen(parsedOptions.listen[2], parsedOptions.listen[1], () => {
	console.log("Server is listening on " + parsedOptions.listen[1] + ":" + parsedOptions.listen[2] + ".");
});