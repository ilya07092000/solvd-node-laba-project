import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { AdminDto, CreateAdminDto } from '@src/dto/admin';

class AdminRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | AdminDto[]> {
    const req = await this.connection.query(
      ` SELECT id, user_id, is_active
        FROM admin
      `,
    );
    const data = req.rows;

    return data
      ? data.map(
          (admin) =>
            new AdminDto({
              ...admin,
              userId: admin.user_id,
              isActive: admin.is_active,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | AdminDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, is_active
        FROM admin
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new AdminDto({
          ...data,
          userId: data.user_id,
          isActive: data.is_active,
        })
      : null;
  }

  async getByUserId({ id }: { id: number }): Promise<null | AdminDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, is_active
        FROM admin
        WHERE user_id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new AdminDto({
          ...data,
          userId: data.user_id,
          isActive: data.is_active,
        })
      : null;
  }

  async create(inputData: CreateAdminDto): Promise<null | AdminDto> {
    const req = await this.connection.query(
      ` INSERT INTO admin (user_id, is_active) 
        VALUES($1, $2) 
        RETURNING *
      `,
      [inputData.userId, inputData.isActive],
    );

    const data = req.rows[0];

    return data
      ? new AdminDto({
          ...data,
          userId: data.user_id,
          isActive: data.is_active,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | AdminDto> {
    const req = await this.connection.query(
      `DELETE FROM admin WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new AdminDto({
          ...data,
          userId: data.user_id,
          isActive: data.is_active,
        })
      : null;
  }

  async update({
    id,
    isActive,
  }: {
    id: number;
    isActive: boolean;
  }): Promise<null | AdminDto> {
    const req = await this.connection.query(
      ` UPDATE admin 
        SET is_active = $1
        WHERE id = $2
        RETURNING *
      `,
      [isActive, id],
    );

    const data = req.rows[0];

    return data
      ? new AdminDto({
          ...data,
          userId: data.user_id,
          isActive: data.is_active,
        })
      : null;
  }
}

const adminRepository = new AdminRepository(
  postgresConnectionInstance.connection,
);
export { adminRepository, AdminRepository };
