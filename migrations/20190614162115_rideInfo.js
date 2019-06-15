// stores Ride information
exports.up = function (knex, Promise) {
    return knex.schema.createTable('ride_info', function (table) {
        table.increments('ride_id')
        table.string('start_zip_code')
        table.string('end_zip_code')
        table.string('cellphone')
        table.date('day_of_ride')
        table.time('start_time')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('ride_info')
};
