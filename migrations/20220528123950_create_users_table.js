/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", table => {
    // table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.increments("id").primary();
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 1000).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
    .createTable("accounts", table => {
      // table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.increments("id").primary();
      table.string("accountName", 255).notNullable();
      // table.string("bankName").notNullable();
      table.string("accountNumber").notNullable();
      table.double("balance").notNullable().defaultTo(0);
      table.integer("userId").unique().references("id").inTable("users").onDelete("cascade");
    })
    .createTable("transactions", table => {
      table.increments("id").primary();
      table.enum('transactionType', ['withdrawal', 'transfer', 'deposit']).notNullable();
      table.double("amount").notNullable();
      table.enum("status", ["success", "failed"]).defaultTo("success").notNullable();
      table.integer("userId").references("id").inTable("users").onDelete("cascade");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions").dropTable("accounts").dropTable("users")
};
