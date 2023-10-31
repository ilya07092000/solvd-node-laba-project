import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { ConflictDto, CreateConflictDto } from '@src/dto/conflict';

class ConflictRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | ConflictDto[]> {
    const req = await this.connection.query(
      `SELECT id, admin_id, case_id, reason, status FROM conflict`,
    );
    const result = req.rows;
    return result
      ? result.map(
          (conflict) =>
            new ConflictDto({
              ...conflict,
              caseId: conflict.case_id,
              adminId: conflict.admin_id,
            }),
        )
      : null;
  }

  async create(data: CreateConflictDto): Promise<null | ConflictDto> {
    const req = await this.connection.query(
      ` INSERT INTO conflict(case_id, reason, status) 
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [data.caseId, data.reason, data.status],
    );

    const result = req.rows[0];
    return result
      ? new ConflictDto({
          ...result,
          caseId: result.case_id,
          adminId: result.admin_id,
        })
      : null;
  }

  async getByCaseId({ id }: { id: number }): Promise<null | ConflictDto> {
    const req = await this.connection.query(
      ` SELECT id, admin_id, case_id, reason, status FROM conflict
        WHERE case_id = $1
      `,
      [id],
    );

    const result = req.rows;
    return result
      ? result.map(
          (conflict) =>
            new ConflictDto({
              ...conflict,
              caseId: conflict.case_id,
              adminId: conflict.admin_id,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | ConflictDto> {
    const req = await this.connection.query(
      ` SELECT id, admin_id, case_id, reason, status FROM conflict
        WHERE id = $1
      `,
      [id],
    );
    const result = req.rows[0];
    return result
      ? new ConflictDto({
          ...result,
          caseId: result.case_id,
          adminId: result.admin_id,
        })
      : null;
  }

  async updateById({
    id,
    updatedConflict,
  }: {
    id: number;
    updatedConflict: Partial<ConflictDto>;
  }): Promise<null | ConflictDto> {
    const currConflict = await this.getById({ id });
    const newConflict = {
      ...currConflict,
      ...updatedConflict,
    };

    const req = await this.connection.query(
      ` UPDATE conflict 
        SET admin_id = $1,
            case_id = $2,
            reason = $3,
            status = $4
        WHERE id = $5
        RETURNING *
      `,
      [
        newConflict.adminId,
        newConflict.caseId,
        newConflict.reason,
        newConflict.status,
        id,
      ],
    );
    const result = req.rows[0];

    return result
      ? new ConflictDto({
          ...result,
          caseId: result.case_id,
          adminId: result.admin_id,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | ConflictDto> {
    const req = await this.connection.query(
      `DELETE FROM conflict WHERE id = $1 RETURNING *`,
      [id],
    );
    const result = req.rows[0];

    return result
      ? new ConflictDto({
          ...result,
          caseId: result.case_id,
          adminId: result.admin_id,
        })
      : null;
  }
}

const conflictRepository = new ConflictRepository(
  postgresConnectionInstance.connection,
);
export { conflictRepository, ConflictRepository };
