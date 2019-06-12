// For testing puirposeds 
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_authentication').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_authentication').insert([
       {id: 1, user_name:"user 1", email:"user1@gmail.com", password:"hello", phone_number:"8888888888"},
       {id: 2, user_name:"user 2"}
      ]);
    });
};
