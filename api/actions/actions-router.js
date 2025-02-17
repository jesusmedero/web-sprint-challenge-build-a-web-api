// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model'); // Importamos el modelo de acciones
const { validateActionFields, checkActionExists } = require('./actions-middleware');

const router = express.Router();

// Obtener todas las acciones
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// Obtener una acción por ID
router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      res.json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving action' });
  }
});

// Crear una nueva acción
router.post('/', validateActionFields, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating action' });
  }
});

// Actualizar una acción existente
router.put('/:id', checkActionExists, validateActionFields, async (req, res) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.json(updatedAction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating action' });
  }
});

// Eliminar una acción
router.delete('/:id', checkActionExists, async (req, res) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting action' });
  }
});

module.exports = router;
