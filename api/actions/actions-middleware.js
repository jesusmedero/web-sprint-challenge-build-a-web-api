// actions/middleware.js

const Actions = require('./actions-model'); // Importamos el modelo Actions

// Middleware para validar los campos necesarios al crear o actualizar una acción
function validateActionFields(req, res, next) {
  const { description, project_id } = req.body;
  
  // Verificar que los campos estén presentes
  if (!description || !project_id) {
    return res.status(400).json({
      message: 'Missing required fields: description and project_id are required',
    });
  }

  next();  // Si pasa la validación, continuar con el siguiente middleware o la ruta
}

// Middleware para verificar si la acción existe en la base de datos
async function checkActionExists(req, res, next) {
  const { id } = req.params;
  
  try {
    const action = await Actions.get(id);  // Usamos el modelo Actions para buscar la acción
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    req.action = action;  // Guardar la acción encontrada en el objeto `req`
    next();  // Continuar con el siguiente middleware o la ruta
  } catch (error) {
    res.status(500).json({ message: 'Error checking action existence' });
  }
}

module.exports = {
  validateActionFields,
  checkActionExists,
};
