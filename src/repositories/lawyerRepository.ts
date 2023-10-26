import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CreateLawyerDto, LawyerDto } from '@src/dto/lawyer';

class LawyerRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    const req = await this.connection.query(
      ` SELECT l.id, l.occupation, l.price, l.experience, l.available, u.first_name, u.last_name, u.email, u.city, u.role_id
        FROM lawyer AS l
        LEFT JOIN "user" AS u ON u.id = l.user_id
      `,
    );
    const data = req.rows;
    if (!data) {
      return null;
    }

    return data;
  }

  async getById({ id }: { id: number }) {
    const req = await this.connection.query(
      ` SELECT l.id, l.occupation, l.price, l.experience, l.available, u.first_name, u.last_name, u.email, u.city, u.role_id
        FROM lawyer AS l
        INNER JOIN "user" AS u ON u.id = l.user_id
        WHERE l.id = $1
      `,
      [id],
    );
    const data = req.rows[0];
    if (!data) {
      return null;
    }

    return data;
  }

  async getByUserId({ id }: { id: number }) {
    const req = await this.connection.query(
      ` SELECT l.id, l.occupation, l.price, l.experience, l.available, u.first_name, u.last_name, u.email, u.city, u.role_id
        FROM lawyer AS l
        INNER JOIN "user" AS u ON u.id = l.user_id
        WHERE u.id = $1
      `,
      [id],
    );
    const data = req.rows[0];
    if (!data) {
      return null;
    }

    return data;
  }

  async create(data: CreateLawyerDto) {
    const req = await this.connection.query(
      ` INSERT INTO lawyer (user_id,occupation,price,experience,available) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING id
      `,
      [
        data.userId,
        data.occupation,
        data.price,
        data.experience,
        data.available,
      ],
    );
    const newLawyerDto = await this.getById({ id: req.rows[0].id });
    return newLawyerDto;
  }

  async deleteById({ id }: { id: number }) {
    const req = await this.connection.query(
      `DELETE FROM "lawyer" WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    if (!data) {
      return null;
    }
    return data;
  }
}

const lawyerRepository = new LawyerRepository(
  postgresConnectionInstance.connection,
);
export { lawyerRepository, LawyerRepository };
