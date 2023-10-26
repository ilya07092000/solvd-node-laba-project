const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const hashedPassword = await bcrypt.hash('admin', +process.env.SALT_ROUNDS);
  await knex.raw(
    `
    DO
    $do$
    DECLARE
      admin_role_id int;
    BEGIN
      IF NOT EXISTS (SELECT FROM "user" INNER JOIN role on role.id = "user".role_id AND role.type = 'admin') THEN
        SELECT id INTO admin_role_id FROM role WHERE type='admin';
        INSERT INTO public.user (role_id,email,password,first_name,last_name,city)
        VALUES
          (admin_role_id, 'admin@admin.com', '${hashedPassword}', 'admin', 'admin', 'admin');
      END IF;
    END
    $do$
  `,
  );
};
