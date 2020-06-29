const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  update,
  remove,
};

function find() {
  return db('tasks as t')
  .join('projects as p', 'p.id','t.project_id')
  .select('t.id','t.description as taskName', 't.notes','p.name as projectName', 'p.description as projectDesc');
}

function findById(id) {
  return db('tasks')
    .where({ id })
    .first()
    .then(task=>{
      if(!task){
        return null;
      } else {
        return task;
      }
    });
}

function update(changes, id) {
  return db('tasks')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

function remove(id) {
  let task = findById(id);
  return db('tasks')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return task;
      } else{
        return null;
      }
    });
}