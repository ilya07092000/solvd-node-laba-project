/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw(`
    DO
    $do$
    BEGIN
      IF NOT EXISTS (SELECT FROM role) THEN
        INSERT INTO public.role (type)
        VALUES
          ('admin'),
          ('lawyer'),
          ('client');
      END IF;
    END
    $do$
  `);
};
