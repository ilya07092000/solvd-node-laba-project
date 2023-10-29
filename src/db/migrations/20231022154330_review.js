/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    DO $$ BEGIN
      CREATE TYPE review_creator AS ENUM ('lawyer', 'client');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$; 
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.review (
      id SERIAL PRIMARY KEY,
      lawyer_id INT,
      message text NOT NULL,
      rate smallint NOT NULL CONSTRAINT rate_value CHECK (rate BETWEEN 1 AND 5),
      creator review_creator NOT NULL
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.review;
  `);
};
