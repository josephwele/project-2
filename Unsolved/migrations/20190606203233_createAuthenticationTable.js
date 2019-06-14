// Creating users authentication and users information table
exports.up = function(knex, Promise) {
// User authentication table
  return knex.schema.createTable('user_login', function (table){
      table.increments('id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password')
      table.date('birthdate')
      table.string('gender')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('user_login')
};
