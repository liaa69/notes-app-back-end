const Hapi = require("@hapi/hapi");
// import fungsi routes pada server.js
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    // Cross-origin resource sharing (CORS) dapat ditetapkan pada spesifik route dengan menambahkan properti options.cors di konfigurasi route
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // configuration pada server
  server.route(routes);
  server.route(
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return {
          status: true,
          message: "Welcome to Notes App"
        }
      },
    },
  )

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
