import http from 'http';
import WebSocket from 'ws';

// TODO: finish implementation
export class WSS {
  private static instance: WebSocket.Server | null = null;

  private constructor() {}
  static getInstance(): WebSocket.Server {
    if (!WSS.instance) {
      const app = {}
      const server = http.createServer(app);
      WSS.instance = new WebSocket.Server({ server });
    }
    return WSS.instance;
  }
  // static init() {
  //   // Add WebSocket connection handling
  //   this.getInstance().on('connection', (ws) => {
  //     console.log('Client connected');

  //     // You can handle messages from clients here
  //     ws.on('message', (message) => {
  //       console.log(`Received message: ${message}`);
  //     });

  //     // // You can also broadcast messages to all clients
  //     // ws.on('message', (message) => {
  //     //   wss.clients.forEach((client) => {
  //     //     if (client.readyState === WebSocket.OPEN) {
  //     //       client.send(message);
  //     //     }
  //     //   });
  //     // });

  //     ws.on('close', () => {
  //       console.log('Client disconnected');
  //     });
  //   });

  }
}