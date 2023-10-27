import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { ClientDto, CreateClientDto } from '@src/dto/client';

class ClientRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | ClientDto[]> {
    const req = await this.connection.query(
      ` SELECT id, user_id, budget
        FROM client
      `,
    );
    const data = req.rows;

    return data
      ? data.map(
          (client) =>
            new ClientDto({
              ...client,
              userId: client.user_id,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | ClientDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, budget
        FROM client
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new ClientDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async getByUserId({ id }: { id: number }): Promise<null | ClientDto> {
    const req = await this.connection.query(
      ` SELECT id, user_id, budget
        FROM client
        WHERE user_id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new ClientDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async create(inputData: CreateClientDto): Promise<null | ClientDto> {
    const req = await this.connection.query(
      ` INSERT INTO client (user_id, budget) 
        VALUES($1, $2) 
        RETURNING *
      `,
      [inputData.userId, inputData.budget],
    );

    const data = req.rows[0];

    return data
      ? new ClientDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | ClientDto> {
    const req = await this.connection.query(
      `DELETE FROM client WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new ClientDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }

  async update({
    id,
    budget,
  }: {
    id: number;
    budget: number;
  }): Promise<null | ClientDto> {
    const req = await this.connection.query(
      ` UPDATE client 
        SET budget = $1
        WHERE id = $2
        RETURNING *
      `,
      [budget, id],
    );

    const data = req.rows[0];

    return data
      ? new ClientDto({
          ...data,
          userId: data.user_id,
        })
      : null;
  }
}

const clientRepository = new ClientRepository(
  postgresConnectionInstance.connection,
);
export { clientRepository, ClientRepository };
