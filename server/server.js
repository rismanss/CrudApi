'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const { routeBarang } = require('./routes/routeBarang');

const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: {
    cors: true
  }
});

const init = async () => {
  await server.register(Inert);
  await routeBarang(server);
  await server.start();
  
  return server;
}

init().then(() => {
  console.log('Server running at:', server.info.uri)
}).catch(err => {
  console.log(err)
  process.exit(1)
});