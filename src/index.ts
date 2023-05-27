import { httpServer } from "./http_server/http_server";
import {WsServer} from "./web_socket/ws_server";

const HTTP_PORT = 8181;
const ws_port = 8080;

httpServer.listen(HTTP_PORT);
const ws_server = new WsServer({port: ws_port});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start web socket server on the ${ws_port} port!`);
