/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("accounts", table => {
    table.increments("id").primary();
    table.string("accountName", 255).notNullable();
    table.string("accountNumber").notNullable();
    table.double("balance").notNullable().defaultTo(0);
    table.integer('userId').unsigned()
    table.foreign('userId').unique().references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts")
};
