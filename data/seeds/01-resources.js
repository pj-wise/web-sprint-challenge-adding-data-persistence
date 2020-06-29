
exports.seed = function(knex) {
      return knex('resources').insert([
        {name: 'Computer'},
        {name: 'Hammer'},
      ]);
};
