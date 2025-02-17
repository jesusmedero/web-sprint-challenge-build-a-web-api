// add middlewares here related to projects
// projects/middleware.js

const Projects = require('./projects-model');

// Middleware para verificar que los campos requeridos estén presentes en el cuerpo de la solicitud
function validateProjectFields(req, res, next) {
    const { name, description, completed } = req.body;
    
    // Verificar que los campos estén presentes
    if (!name || !description || completed === undefined) {
      return res.status(400).json({
        message: 'Missing required fields: name, description, and completed are required',
      });
    }
    
    next();  // Si pasa la validación, continuar con el siguiente middleware o la ruta
  }
  
  // Middleware para verificar si el proyecto existe en la base de datos
  async function checkProjectExists(req, res, next) {
    const { id } = req.params;
    
    try {
      const project = await Projects.get(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      req.project = project;  // Guardar el proyecto encontrado en el objeto `req`
      next();  // Continuar con el siguiente middleware o la ruta
    } catch (error) {
      res.status(500).json({ message: 'Error checking project existence' });
    }
  }
  
  module.exports = {
    validateProjectFields,
    checkProjectExists,
  };
  