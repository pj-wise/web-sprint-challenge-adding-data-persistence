const express = require('express');

const tDb = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  tDb.find()
  .then(tasks => {
    let tmp = tasks.map(task=>{return {...task, completed: task.completed===1?true:false}})
    res.json(tmp);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  tDb.findById(id)
  .then(task => {
    if (task) {
      let tmp = {...task, completed: task.completed===1?true:false}
      res.json(tmp);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  tDb.findById(id)
  .then(task => {
    if (task) {
      tDb.update(changes, id)
      .then(u => {
        res.json(u);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  tDb.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete task' });
  });
});

module.exports = router;