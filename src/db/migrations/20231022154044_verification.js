/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    DO $$ BEGIN
      CREATE TYPE verification_status AS ENUM ('verified', 'rejected');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$; 
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.verification (
      id SERIAL PRIMARY KEY,
      verifier_id INT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT now(),
      notes VARCHAR(255) NOT NULL,
      status verification_status NOT NULL,
      CONSTRAINT fk_verifier
        FOREIGN KEY(verifier_id) 
            REFERENCES admin(id)
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.verification;
  `);
};
