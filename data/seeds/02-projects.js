
exports.seed = function(knex) {
      return knex('projects').insert([
        {name: 'Write Program', completed:true},
        {name: 'Build Shelf', completed:false},
      ]);
};
