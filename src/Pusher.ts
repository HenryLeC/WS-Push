export class WebSocketPush {
  ws: WebSocket;

  constructor(serverUrl: string) {
    this.ws = new WebSocket(serverUrl);
  }

  publish<T>(group: string, value: T) {
    this.ws.send(JSON.stringify({ group, value }));
  }

  subscribe<T>(group: string, callback: (arg0: T) => any) {
    this.ws.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.group === group) {
        callback(event.data.value);
      }
    });
  }
}
