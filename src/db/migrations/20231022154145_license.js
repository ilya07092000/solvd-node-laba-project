/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.license (
      id SERIAL PRIMARY KEY,
      lawyer_id INT NOT NULL,
      verification_id INT NOT NULL,
      CONSTRAINT fk_lawyer
        FOREIGN KEY(lawyer_id) 
            REFERENCES lawyer(id),
      CONSTRAINT fk_verification
        FOREIGN KEY(verification_id) 
            REFERENCES verification(id)
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.license;
  `);
};
