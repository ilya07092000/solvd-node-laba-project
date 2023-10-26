import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { RoleDto } from '@src/dto/role';

class RoleRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | RoleDto[]> {
    const req = await this.connection.query(`SELECT * FROM role`);
    const result = req.rows;
    return result ? result.map((r) => new RoleDto(r)) : null;
  }

  async create({ type }: { type: string }): Promise<null | RoleDto> {
    const req = await this.connection.query(
      `INSERT INTO role(type) VALUES($1)`,
      [type],
    );
    const result = req.rows;
    return result ? new RoleDto(result) : null;
  }

  async getByType({ type }: { type: string }): Promise<null | RoleDto> {
    const req = await this.connection.query(
      ` SELECT * FROM role
        WHERE type = $1
      `,
      [type],
    );
    const result = req.rows[0];
    return result ? new RoleDto(result) : null;
  }

  async getById({ id }: { id: number }): Promise<null | RoleDto> {
    const req = await this.connection.query(
      ` SELECT * FROM role
        WHERE id = $1
      `,
      [id],
    );
    const result = req.rows[0];
    return result ? new RoleDto(result) : null;
  }

  async update({
    id,
    type,
  }: {
    id: number;
    type: string;
  }): Promise<null | RoleDto> {
    const req = await this.connection.query(
      ` UPDATE role 
        SET type = $1
        WHERE id = $2
        RETURNING *
      `,
      [type, id],
    );
    const result = req.rows[0];
    return result ? new RoleDto(result) : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | RoleDto> {
    const req = await this.connection.query(
      `DELETE FROM role WHERE id = $1 RETURNING *`,
      [id],
    );
    const result = req.rows[0];
    return result ? new RoleDto(result) : null;
  }
}

const roleRepository = new RoleRepository(
  postgresConnectionInstance.connection,
);
export { roleRepository, RoleRepository };
