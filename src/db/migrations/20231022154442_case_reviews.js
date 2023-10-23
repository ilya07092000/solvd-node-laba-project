/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS public.case_reviews (
      case_id INT NOT NULL,
      review_id INT NOT NULL,
      CONSTRAINT fk_review
        FOREIGN KEY(review_id) 
            REFERENCES review(id),
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
    DROP TABLE IF EXISTS public.case_reviews;
  `);
};
