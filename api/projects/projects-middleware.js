// add middlewares here related to projects
// projects/middleware.js

const Projects = require('./projects-model');


function validateProjectFields(req, res, next) {
    const { name, description, completed } = req.body;
    
    
    if (!name || !description || completed === undefined) {
      return res.status(400).json({
        message: 'Missing required fields: name, description, and completed are required',
      });
    }
    
    next();  
  }
  
  
  async function checkProjectExists(req, res, next) {
    const { id } = req.params;
    
    try {
      const project = await Projects.get(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      req.project = project;  
      next();  
    } catch (error) {
      res.status(500).json({ message: 'Error checking project existence' });
    }
  }
  
  module.exports = {
    validateProjectFields,
    checkProjectExists,
  };
  