
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.decimal('agencia', [], [0]).notNull()
        table.decimal('conta', [], [0]).notNull()
        table.string('password').notNull()
        table.decimal('money', 14, 2).notNull().defaultTo(0)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
