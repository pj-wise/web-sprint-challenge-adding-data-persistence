
exports.seed = function(knex) {
      return knex('resource_projects').insert([
        {project_id:1, resource_id:1},
        {project_id:2, resource_id:2}
      ]);
};
