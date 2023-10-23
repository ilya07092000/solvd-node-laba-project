/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw(`
    INSERT INTO public.role (type) 
    VALUES
      ('admin'),
      ('lawyer'),
      ('client')
  `);
};
