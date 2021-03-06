// Update with your config settings.

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Gondermylife12',
            database: 'testDB',
            debug: ['ComQueryPacket', 'RowDataPacket']
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Gondermylife12',
            database: 'testDB',
            debug: ['ComQueryPacket', 'RowDataPacket']
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_URL,
            port: 3306,
            user: 'root',
            password: 'Gondermylife12',
            database: 'appDB'
        }
    }
}