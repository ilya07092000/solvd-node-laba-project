import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CreateUserDto, UserDto } from '@src/dto/user';

class UserRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<UserDto[]> {
    const req = await this.connection.query(
      ` SELECT id, password, email, first_name, last_name, city, role_id 
        FROM "user"
      `,
    );
    if (!req.rows.length) {
      return [];
    }

    const mappedUsers = req.rows.map(
      (data) =>
        new UserDto({
          ...data,
          roleId: data.role_id,
          firstName: data.first_name,
          lastName: data.last_name,
        }),
    );
    return mappedUsers;
  }

  async getById({
    id,
  }: {
    id: number;
  }): Promise<null | { dto: UserDto; password: string }> {
    const req = await this.connection.query(
      ` SELECT id, password, email, first_name, last_name, city, role_id 
        FROM "user"
        WHERE "user".id = $1
      `,
      [id],
    );
    const data = req.rows[0];
    if (!data) {
      return null;
    }

    return {
      dto: new UserDto({
        ...data,
        roleId: data.role_id,
        firstName: data.first_name,
        lastName: data.last_name,
      }),
      password: data.password,
    };
  }

  async getByEmail({
    email,
  }: {
    email: string;
  }): Promise<null | { dto: UserDto; password: string }> {
    const req = await this.connection.query(
      ` SELECT id, password, email, first_name, last_name, city, role_id 
        FROM "user"
        WHERE "user".email = $1
      `,
      [email],
    );
    const data = req.rows[0];
    if (!data) {
      return null;
    }

    return {
      dto: new UserDto({
        ...data,
        roleId: data.role_id,
        firstName: data.first_name,
        lastName: data.last_name,
      }),
      password: data.password,
    };
  }

  async create(data: CreateUserDto) {
    const result = await this.connection.query(
      ` INSERT INTO "user" 
        (role_id,email,password,first_name,last_name,city) VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id
      `,
      [
        data.roleId,
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.city,
      ],
    );
    const newUser = await this.getById({ id: result.rows[0].id });
    return newUser.dto;
  }

  async deleteById({ id }: { id: number }): Promise<UserDto | null> {
    const req = await this.connection.query(
      `DELETE FROM "user" WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    if (!data) {
      return null;
    }
    return new UserDto({
      ...data,
      firstName: data?.first_name,
      lastName: data?.last_name,
    });
  }

  async updateById({
    id,
    updatedUser,
  }: {
    id: number;
    updatedUser: Partial<CreateUserDto>;
  }): Promise<null | { dto: UserDto; password: string }> {
    const currUser = await this.getById({ id });
    const newUser = {
      ...currUser.dto,
      password: currUser.password,
      ...updatedUser,
    };

    const req = await this.connection.query(
      ` UPDATE "user" 
        SET role_id = $1,
            email = $2,
            password = $3,
            first_name = $4,
            last_name = $5,
            city = $6
        WHERE "user".id = $7
        RETURNING *
      `,
      [
        newUser.roleId,
        newUser.email,
        newUser.password,
        newUser.firstName,
        newUser.lastName,
        newUser.city,
        id,
      ],
    );
    const result = req.rows[0];

    if (!result) {
      return null;
    }
    return {
      dto: new UserDto({
        ...result,
        roleId: result.role_id,
        firstName: result.first_name,
        lastName: result.last_name,
      }),
      password: result.password,
    };
  }
}

const userRepository = new UserRepository(
  postgresConnectionInstance.connection,
);
export { userRepository, UserRepository };
