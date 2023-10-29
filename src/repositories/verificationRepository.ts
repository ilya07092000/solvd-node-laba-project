import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { VerificationDto, CreateVerificationDto } from '@src/dto/verfication';

class VerificationRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | VerificationDto[]> {
    const req = await this.connection.query(
      ` SELECT id, verifier_id, date, notes, status
        FROM verification
      `,
    );
    const data = req.rows;

    return data
      ? data.map(
          (verification) =>
            new VerificationDto({
              ...verification,
              verifierId: verification.verifier_id,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | VerificationDto> {
    const req = await this.connection.query(
      ` SELECT id, verifier_id, date, notes, status
        FROM verification
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new VerificationDto({
          ...data,
          verifierId: data.verifier_id,
        })
      : null;
  }

  async create(
    inputData: CreateVerificationDto,
  ): Promise<null | VerificationDto> {
    const req = await this.connection.query(
      ` INSERT INTO verification (verifier_id, notes, status) 
        VALUES($1, $2, $3) 
        RETURNING *
      `,
      [inputData.verifierId, inputData.notes, inputData.status],
    );

    const data = req.rows[0];

    return data
      ? new VerificationDto({
          ...data,
          verifierId: data.verifier_id,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | VerificationDto> {
    const req = await this.connection.query(
      `DELETE FROM verification WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new VerificationDto({
          ...data,
          verifierId: data.verifier_id,
        })
      : null;
  }

  async update({
    id,
    verificationInfo,
  }: {
    id: number;
    verificationInfo: Partial<VerificationDto>;
  }): Promise<null | VerificationDto> {
    const currVerification = await this.getById({ id });
    const mixedVerification = {
      ...currVerification,
      ...verificationInfo,
    };

    const req = await this.connection.query(
      ` UPDATE verification 
        SET notes = $1,
            verifier_id = $2,
            status = $3
        WHERE id = $4
        RETURNING *
      `,
      [
        mixedVerification.notes,
        mixedVerification.verifierId,
        mixedVerification.status,
        id,
      ],
    );

    const data = req.rows[0];

    return data
      ? new VerificationDto({
          ...data,
          verifierId: data.verifier_id,
        })
      : null;
  }
}

const verificationRepository = new VerificationRepository(
  postgresConnectionInstance.connection,
);
export { verificationRepository, VerificationRepository };
