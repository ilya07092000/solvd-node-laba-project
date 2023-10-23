/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.client (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      budget INT DEFAULT 0,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
            REFERENCES "user"(id)
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.client;
  `);
};
