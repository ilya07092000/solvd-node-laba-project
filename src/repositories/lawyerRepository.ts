import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CreateLawyerDto, LawyerDto } from '@src/dto/lawyer';

class LawyerRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | LawyerDto[]> {
    const req = await this.connection.query(
      ` SELECT id, user_id, occupation, price, experience, available
        FROM lawyer
      `,
    );

    const data = req.rows;

    return data
      ? data.map(
          (lawyer) =>
            new LawyerDto({
              ...lawyer,
              userId: lawyer.user_id,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | LawyerDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, occupation, price, experience, available
        FROM lawyer
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new LawyerDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async getByUserId({ id }: { id: number }): Promise<null | LawyerDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, occupation, price, experience, available
        FROM lawyer
        WHERE user_id = $1
      `,
      [id],
    );

    const data = req.rows[0];

    return data
      ? new LawyerDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async create(inputData: CreateLawyerDto) {
    const req = await this.connection.query(
      ` INSERT INTO lawyer (user_id,occupation,price,experience,available) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *
      `,
      [
        inputData.userId,
        inputData.occupation,
        inputData.price,
        inputData.experience,
        inputData.available,
      ],
    );

    const data = req.rows[0];

    return data
      ? new LawyerDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async deleteById({ id }: { id: number }) {
    const req = await this.connection.query(
      `DELETE FROM "lawyer" WHERE id = $1 RETURNING *`,
      [id],
    );

    const data = req.rows[0];

    return data
      ? new LawyerDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async updateById({
    id,
    updatedLawyer,
  }: {
    id: number;
    updatedLawyer: Partial<CreateLawyerDto>;
  }): Promise<null | LawyerDto> {
    const currLawyer = await this.getById({ id });
    const newLawyer = {
      ...currLawyer,
      ...updatedLawyer,
    };

    const req = await this.connection.query(
      ` UPDATE lawyer 
        SET available = $1,
            experience = $2,
            occupation = $3,
            price = $4,
            user_id = $5
        WHERE id = $6
        RETURNING *
      `,
      [
        newLawyer.available,
        newLawyer.experience,
        newLawyer.occupation,
        newLawyer.price,
        newLawyer.userId,
        id,
      ],
    );
    const data = req.rows[0];

    return data
      ? new LawyerDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }
}

const lawyerRepository = new LawyerRepository(
  postgresConnectionInstance.connection,
);
export { lawyerRepository, LawyerRepository };
