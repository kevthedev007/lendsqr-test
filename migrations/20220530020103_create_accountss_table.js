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
    table.integer("userId").unique().references("id").inTable("users").onDelete("cascade");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts")
};
