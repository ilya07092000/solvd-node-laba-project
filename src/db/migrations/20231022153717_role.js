/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    DO $$ BEGIN
      CREATE TYPE role_type AS ENUM ('admin', 'lawyer', 'client');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$; 
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.role (
      id SERIAL PRIMARY KEY,
      type role_type
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.role;
  `);
};
