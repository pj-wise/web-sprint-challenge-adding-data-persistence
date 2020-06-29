
exports.seed = function(knex) {
      return knex('tasks').insert([
        {description: 'Open VSCode', completed:true,project_id:1},
        {description: 'Type the things', completed:false,project_id:1},
        {description: 'Get wood', completed:true,project_id:2},
        {description: 'Hammer wood together', completed:false,project_id:2}
      ]);
};
