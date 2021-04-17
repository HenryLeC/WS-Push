import { WebSocketPush, WebSocketServer } from '../index';

const server = new WebSocketServer(8080);
const push1 = new WebSocketPush('ws://localhost:8080');
const push2 = new WebSocketPush('ws://localhost:8080');

test('pubSub', async () => {
  const TestValue = 'Hello';
  while (push2.ws.readyState !== push2.ws.OPEN) {
    await new Promise((r) => setTimeout(r, 500));
  }
  push1.subscribe<string>('publishTest', (value) => expect(value).toBe(TestValue));
  push2.publish<string>('publishTest', TestValue);
});

afterAll(() => server.close());
