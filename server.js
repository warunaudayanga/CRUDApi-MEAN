const app = require('./backend/app')
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
    let port = parseInt(val, 10)
    if(isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = () => {
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
// noinspection JSCheckFunctionSignatures
server.listen(port);
