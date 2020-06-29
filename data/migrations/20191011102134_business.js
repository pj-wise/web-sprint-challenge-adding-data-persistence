
exports.up = function(knex) {
  return knex.schema
  .createTable('resources',tbl=>{
    tbl.increments();
    tbl.string('name',128)
      .notNullable()
      .unique();
    tbl.text('description',255);
    
  })
  .createTable('projects',tbl=>{
    tbl.increments();
    tbl.string('name',128)
      .notNullable()
      .unique();
    tbl.text('description',255);
    tbl.boolean('completed')
      .notNullable()
      .defaultTo(0);

  })
  .createTable('resource_projects',tbl=>{
    tbl.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.primary(['resource_id', 'project_id']);
    
  })
  .createTable('tasks',tbl=>{
    tbl.increments();
    tbl.text('description',255)
      .notNullable();
    tbl.text('notes',255);
    tbl.boolean('completed')
      .notNullable()
      .defaultTo(0);
    tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resource_projects')
    .dropTableIfExists('projects')
    .dropTableIfExists('resources');
};
