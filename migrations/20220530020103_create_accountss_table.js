/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("accounts", table => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("accountName", 255).notNullable();
    table.string("accountNumber").notNullable();
    table.double("balance").notNullable().defaultTo(0);
    table.integer('userId').unsigned().nullable();
    table.foreign('userId').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts")
};
