/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", table => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 1000).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users")
};
