// actions/middleware.js

const Actions = require('./actions-model'); 


function validateActionFields(req, res, next) {
  const { description, project_id } = req.body;
  
  
  if (!description || !project_id) {
    return res.status(400).json({
      message: 'Missing required fields: description and project_id are required',
    });
  }

  next();  
}


async function checkActionExists(req, res, next) {
  const { id } = req.params;
  
  try {
    const action = await Actions.get(id);  
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    req.action = action;  
    next();  
  } catch (error) {
    res.status(500).json({ message: 'Error checking action existence' });
  }
}

module.exports = {
  validateActionFields,
  checkActionExists,
};
