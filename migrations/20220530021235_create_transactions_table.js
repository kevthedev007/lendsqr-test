/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", table => {
    table.increments("id").primary();
    table.enum('transactionType', ['withdrawal', 'transfer', 'deposit']).notNullable();
    table.double("amount").notNullable();
    table.enum("status", ["success", "failed"]).defaultTo("success").notNullable();
    table.integer('userId').unsigned().nullable();
    table.foreign('userId').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions")
};
