const http = require("http");
const PORT = 3000;
const app = require("./App");

const server = http.createServer(app);

server.listen(PORT);
