// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model'); 
const { validateProjectFields, checkProjectExists } = require('./projects-middleware');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving project' });
    }
});


router.post('/', validateProjectFields, async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project' });
    }
});


router.put('/:id', checkProjectExists, validateProjectFields, async (req, res) => {
    try {
      const updatedProject = await Projects.update(req.params.id, req.body);
      if (updatedProject) {
        res.json(updatedProject);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error updating project' });
    }
  });



router.delete('/:id', checkProjectExists, async (req, res) => {
    try {
        const deleted = await Projects.remove(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
});


router.get('/:id/actions', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving project actions' });
    }
});

module.exports = router;
