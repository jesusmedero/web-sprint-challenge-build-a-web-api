const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json()); // Permite manejar JSON en las solicitudes

// Importar routers
const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router'); // Asegúrate de tener este archivo


// Usar routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter); // Agrega el router de acciones

// Middleware para manejar errores (opcional pero recomendado)
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = server;