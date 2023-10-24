import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CreateUserDto, UserDto } from '@src/dto/user';
import IToken from '@src/infrastructure/interfaces/IToken';

class UserRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getById({
    id,
  }: {
    id: number;
  }): Promise<{ dto: UserDto; password: string }> {
    const result = await this.connection.query(
      ` SELECT "user".id, "user".password, "user".email, "user".first_name, "user".last_name, "user".city, role.type role 
        FROM "user"
        INNER JOIN role ON "user".role_id = role.id
        WHERE "user".id = $1
      `,
      [id],
    );
    const data = result.rows[0];

    return {
      dto: new UserDto({
        ...data,
        firstName: data?.first_name,
        lastName: data?.last_name,
      }),
      password: data.password,
    };
  }

  async getByEmail({
    email,
  }: {
    email: string;
  }): Promise<{ dto: UserDto; password: string }> {
    const result = await this.connection.query(
      ` SELECT "user".id, "user".password, "user".email, "user".first_name, "user".last_name, "user".city, role.type role 
        FROM "user"
        INNER JOIN role ON "user".role_id = role.id
        WHERE "user".email = $1
      `,
      [email],
    );
    const data = result.rows[0];

    return {
      dto: new UserDto({
        ...data,
        firstName: data?.first_name,
        lastName: data?.last_name,
      }),
      password: data?.password,
    };
  }

  async create(data: CreateUserDto) {
    const result = await this.connection.query(
      'INSERT INTO "user" (role_id,email,password,first_name,last_name,city) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
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
}

const userRepository = new UserRepository(
  postgresConnectionInstance.connection,
);
export { userRepository, UserRepository };
