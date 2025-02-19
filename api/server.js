const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json()); 


const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router'); 



server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter); 


server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = server;