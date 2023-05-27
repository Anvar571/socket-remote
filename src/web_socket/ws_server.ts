import {WebSocketServer, Server, WebSocket, createWebSocketStream} from "ws";
import { runCommand } from "./cli";

interface WsServerOption {
    port: number;
}

export class WsServer {
    server: Server<WebSocket> | null;

    constructor(opstions: WsServerOption) {
        this.server = new WebSocketServer(opstions);

        this.server.on("connection", (ws) => {
            const duplex = createWebSocketStream(ws, {decodeStrings: false});
            duplex.on("data", async (data) => {
                console.log("received: %s", data);
                const response = await runCommand(data.toString());
                const msg = response ? response.data:"";

                duplex.write(`${data.toString().split(' ')[0]} ${msg}`)
            });
            duplex.on("close", () => {
                console.log("the duplex channel has closed");
            })
        })
    }
}