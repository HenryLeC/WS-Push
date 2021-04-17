import { IncomingMessage } from 'http';
import { Server } from 'ws';

export class WebSocketServer {
  wss: Server;

  constructor(port: number) {
    this.wss = new Server({ port });
    const wss = this.wss;
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(data);
          }
        });
      });
    });
  }

  close() {
    this.wss.close();
  }
}
