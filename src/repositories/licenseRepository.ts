import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { LicenseDto, CreateLicenseDto } from '@src/dto/license';

class LicenseRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | LicenseDto[]> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, verification_id, info
        FROM license
      `,
    );
    const data = req.rows;

    return data
      ? data.map(
          (license) =>
            new LicenseDto({
              ...license,
              lawyerId: license.lawyer_id,
              verificationId: license.verification_id,
            }),
        )
      : null;
  }

  async getById({ id }: { id: number }): Promise<null | LicenseDto> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, verification_id, info
        FROM license
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new LicenseDto({
          ...data,
          lawyerId: data.lawyer_id,
          verificationId: data.verification_id,
        })
      : null;
  }

  async getBylawyerId({ id }: { id: number }): Promise<null | LicenseDto> {
    const req = await this.connection.query(
      ` SELECT id, lawyer_id, verification_id, info
        FROM license
        WHERE lawyer_id = $1
      `,
      [id],
    );
    const data = req.rows;

    return data
      ? data.map(
          (license) =>
            new LicenseDto({
              ...license,
              lawyerId: license.lawyer_id,
              verificationId: license.verification_id,
            }),
        )
      : null;
  }

  async create(inputData: CreateLicenseDto): Promise<null | LicenseDto> {
    const req = await this.connection.query(
      ` INSERT INTO license (info, lawyer_id) 
        VALUES($1, $2) 
        RETURNING *
      `,
      [inputData.info, inputData.lawyerId],
    );

    const data = req.rows[0];

    return data
      ? new LicenseDto({
          ...data,
          lawyerId: data.lawyer_id,
          verificationId: data.verification_id,
        })
      : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | LicenseDto> {
    const req = await this.connection.query(
      `DELETE FROM license WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data
      ? new LicenseDto({
          ...data,
          lawyerId: data.lawyer_id,
          verificationId: data.verification_id,
        })
      : null;
  }

  async update({
    id,
    licenseInfo,
  }: {
    id: number;
    licenseInfo: Partial<LicenseDto>;
  }): Promise<null | LicenseDto> {
    const currLicense = await this.getById({ id });
    const mixedLicense = {
      ...currLicense,
      ...licenseInfo,
    };

    const req = await this.connection.query(
      ` UPDATE license 
        SET lawyer_id = $1,
            verification_id = $2,
            info = $3
        WHERE id = $4
        RETURNING *
      `,
      [
        mixedLicense.lawyerId,
        mixedLicense.verificationId,
        mixedLicense.info,
        mixedLicense.id,
      ],
    );

    const data = req.rows[0];

    return data
      ? new LicenseDto({
          ...data,
          lawyerId: data.lawyer_id,
          verificationId: data.verification_id,
        })
      : null;
  }
}

const licenseRepository = new LicenseRepository(
  postgresConnectionInstance.connection,
);
export { licenseRepository, LicenseRepository };
