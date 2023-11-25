# backend-websocket-nodejs

This backend server aims to capture `latitude, longitude, heading` over WebSocket, store it, then serve it to the VUE.js frontend.

## Run backend

To run:
```shell
docker compose up
```

## Run mock server

To use the mock-server that send `lat,lon,heading` to the backend over websocket, run:
```shell
npm run mock-server
```
