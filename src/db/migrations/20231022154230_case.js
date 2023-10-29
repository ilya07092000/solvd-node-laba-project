/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    DO $$ BEGIN
      CREATE TYPE case_status AS ENUM ('active', 'fulfilled', 'failed', 'creating');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$; 
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.case (
      id SERIAL PRIMARY KEY,
      lawyer_id INT,
      client_id INT NOT NULL,
      description text NOT NULL,
      status case_status DEFAULT 'creating' NOT NULL,
      budget INT NOT NULL,
      start_date TIMESTAMP WITH TIME ZONE,
      end_date TIMESTAMP WITH TIME ZONE,
      CONSTRAINT fk_lawyer
        FOREIGN KEY(lawyer_id) 
            REFERENCES lawyer(id),
      CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
            REFERENCES client(id)
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.case;
  `);
};
