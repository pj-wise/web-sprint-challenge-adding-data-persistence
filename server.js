const express = require('express');

const ResourceRouter = require('./resources/resource-router.js');
const ProjectRouter = require('./projects/project-router.js');
const TaskRouter = require('./tasks/task-router.js');

const server = express();

server.use(express.json());
server.use('/api/resources', ResourceRouter);
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);

module.exports = server;