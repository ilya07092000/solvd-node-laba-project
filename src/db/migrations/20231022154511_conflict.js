/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    DO $$ BEGIN
      CREATE TYPE conflict_status AS ENUM ('fulfilled', 'rejected', 'processing');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$; 
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.conflict (
      id SERIAL PRIMARY KEY,
      admin_id INT,
      case_id INT NOT NULL,
      reason VARCHAR(255) NOT NULL,
      status conflict_status DEFAULT 'processing',
      CONSTRAINT fk_admin
        FOREIGN KEY(admin_id) 
            REFERENCES admin(id),
      CONSTRAINT fk_case
        FOREIGN KEY(case_id) 
            REFERENCES "case"(id)
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS public.conflict;
  `);
};
