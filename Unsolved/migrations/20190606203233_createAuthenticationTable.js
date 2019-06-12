// Creating users authentication and users information table
exports.up = function(knex, Promise) {
// User authentication table
  return knex.schema.createTable('users_authentication', function (table){
      table.increments('id')
      table.string('user_name')
      table.string('email')
      table.string('password')
      table.string('phone_number')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users_authentication')
};
