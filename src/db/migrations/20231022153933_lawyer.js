/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.lawyer (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      occupation VARCHAR(255),
      price INT DEFAULT 0,
      experience VARCHAR(255),
      available BOOLEAN NOT NULL DEFAULT FALSE,
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
    DROP TABLE IF EXISTS public.lawyer;
  `);
};
