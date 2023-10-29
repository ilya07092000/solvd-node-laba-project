import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CaseDto, CreateCaseDto } from '@src/dto/case';

class CaseRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | CaseDto[]> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, client_id, description, status, budget, start_date, end_date
        FROM "case"
      `,
    );
    const data = req.rows;

    return data
      ? data.map(
          (currCase) =>
            new CaseDto({
              ...currCase,
              lawyerId: currCase.lawyer_id,
              clientId: currCase.client_id,
              startDate: currCase.start_date,
              endDate: currCase.end_date,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | CaseDto> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, client_id, description, status, budget, start_date, end_date
        FROM "case"
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new CaseDto({
          ...data,
          lawyerId: data.lawyer_id,
          clientId: data.client_id,
          startDate: data.start_date,
          endDate: data.end_date,
        })
      : null;
  }

  async getBylawyerId({ id }: { id: number }): Promise<null | CaseDto> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, client_id, description, status, budget, start_date, end_date
        FROM "case"
        WHERE lawyer_id = $1
      `,
      [id],
    );
    const data = req.rows;

    return data
      ? data.map(
          (currCase) =>
            new CaseDto({
              ...currCase,
              lawyerId: currCase.lawyer_id,
              clientId: currCase.client_id,
              startDate: currCase.start_date,
              endDate: currCase.end_date,
            }),
        )
      : null;
  }

  async getByClientId({ id }: { id: number }): Promise<null | CaseDto> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, client_id, description, status, budget, start_date, end_date
        FROM "case"
        WHERE client_id = $1
      `,
      [id],
    );
    const data = req.rows;

    return data
      ? data.map(
          (currCase) =>
            new CaseDto({
              ...currCase,
              lawyerId: currCase.lawyer_id,
              clientId: currCase.client_id,
              startDate: currCase.start_date,
              endDate: currCase.end_date,
            }),
        )
      : null;
  }

  async create(inputData: CreateCaseDto): Promise<null | CaseDto> {
    const req = await this.connection.query(
      ` INSERT INTO "case" (lawyer_id, client_id, description, status, budget, start_date, end_date) 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
      `,
      [
        inputData.lawyerId,
        inputData.clientId,
        inputData.description,
        inputData.status,
        inputData.budget,
        inputData.startDate,
        inputData.endDate,
      ],
    );

    const data = req.rows[0];

    return data
      ? new CaseDto({
          ...data,
          lawyerId: data.lawyer_id,
          clientId: data.client_id,
          startDate: data.start_date,
          endDate: data.end_date,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | CaseDto> {
    const req = await this.connection.query(
      `DELETE FROM "case" WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new CaseDto({
          ...data,
          lawyerId: data.lawyer_id,
          clientId: data.client_id,
          startDate: data.start_date,
          endDate: data.end_date,
        })
      : null;
  }

  async update({
    id,
    caseInfo,
  }: {
    id: number;
    caseInfo: Partial<CaseDto>;
  }): Promise<null | CaseDto> {
    const currCase = await this.getById({ id });
    const mixedCase = {
      ...currCase,
      ...caseInfo,
    };

    const req = await this.connection.query(
      ` UPDATE "case" 
        SET lawyer_id = $1,
            client_id = $2,
            description = $3,
            status = $4,
            budget = $5,
            start_date = $6,
            end_date = $7
        WHERE id = $8
        RETURNING *
      `,
      [
        mixedCase.lawyerId,
        mixedCase.clientId,
        mixedCase.description,
        mixedCase.status,
        mixedCase.budget,
        mixedCase.startDate,
        mixedCase.endDate,
        id,
      ],
    );

    const data = req.rows[0];

    return data
      ? new CaseDto({
          ...data,
          lawyerId: data.lawyer_id,
          clientId: data.client_id,
          startDate: data.start_date,
          endDate: data.end_date,
        })
      : null;
  }
}

const caseRepository = new CaseRepository(
  postgresConnectionInstance.connection,
);
export { caseRepository, CaseRepository };
