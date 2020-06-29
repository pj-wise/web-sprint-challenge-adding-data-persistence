const express = require('express');

const rDb = require('./resource-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  rDb.find()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  rDb.findById(id)
  .then(resource => {
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Could not find resource with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

router.post('/', (req, res) => {
  const resourceData = req.body;

  rDb.add(resourceData)
  .then(resource => {
    res.status(201).json(resource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  rDb.findById(id)
  .then(resource => {
    if (resource) {
      rDb.update(changes, id)
      .then(u => {
        res.json(u);
      });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update resource' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  rDb.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete resource' });
  });
});

module.exports = router;