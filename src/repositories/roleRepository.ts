import { postgresConnectionInstance } from '@src/db/postgres/connection';

class RoleRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getByType({ type }: { type: string }) {
    const result = await this.connection.query(
      ` SELECT * FROM role
        WHERE type = $1
      `,
      [type],
    );
    return result.rows[0];
  }
}

const roleRepository = new RoleRepository(
  postgresConnectionInstance.connection,
);
export { roleRepository, RoleRepository };
