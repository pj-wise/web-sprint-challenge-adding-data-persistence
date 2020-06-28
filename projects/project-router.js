const express = require('express');

const pDb = require('./project-model');

const router = express.Router();

router.get('/', (req, res) => {
  pDb.find()
    .then(projects => {
      let tmp = projects.map(project => { return { ...project, completed: project.completed === 1 ? true : false } })
      res.json(tmp);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  pDb.findById(id)
    .then(project => {
      if (project) {
        let tmp = { ...project, completed: project.completed === 1 ? true : false }
        pDb.findTasks(id)
          .then(tasks => {
            pDb.findResources(id)
              .then(resources => {
                if (resources.length) {
                  tmp.resources = resources;
                }
                if (tasks.length) {
                  tmp.tasks = tasks;
                }
                res.json(tmp);
              })
              .catch(err => {
                res.status(500).json({ message: 'Failed to get resources' });
              });
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks' });
          });
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  pDb.findTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  pDb.add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
});

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  pDb.findById(id)
    .then(project => {
      if (project) {
        pDb.addTask(taskData, id)
          .then(task => {
            res.status(201).json(task);
          })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  pDb.findById(id)
    .then(project => {
      if (project) {
        pDb.update(changes, id)
          .then(u => {
            res.json(u);
          });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update project' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  pDb.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete project' });
    });
});

module.exports = router;