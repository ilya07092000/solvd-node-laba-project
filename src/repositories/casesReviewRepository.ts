import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CasesReviewsDto } from '@src/dto/casesReviews';

class CasesReviewsRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | CasesReviewsDto[]> {
    const req = await this.connection.query(`
      SELECT r.id, r.rate, r.message, r.creator
      FROM review AS r
      INNER JOIN case_reviews ON case_reviews.review_id = r.id
      INNER JOIN "case" AS c ON "c".id = case_reviews.case_id
      `);
    const result = req.rows;

    return result ? result.map((r) => new CasesReviewsDto(r)) : null;
  }

  async create({
    caseId,
    reviewId,
  }: {
    caseId: number;
    reviewId: number;
  }): Promise<null | CasesReviewsDto> {
    const req = await this.connection.query(
      ` INSERT INTO case_reviews(case_id, review_id) 
        VALUES($1, $2)
        RETURNING *
      `,
      [caseId, reviewId],
    );
    const result = req.rows[0];
    return result ? new CasesReviewsDto(result) : null;
  }

  async getByCaseId({ id }: { id: number }): Promise<null | CasesReviewsDto> {
    const req = await this.connection.query(
      ` SELECT r.id, r.rate, r.message, r.creator
        FROM review AS r
        INNER JOIN case_reviews ON case_reviews.review_id = r.id
        INNER JOIN "case" AS c ON "c".id = case_reviews.case_id
        WHERE case_reviews.case_id = $1
      `,
      [id],
    );
    const result = req.rows;

    return result ? result.map((r) => new CasesReviewsDto(r)) : null;
  }
}

const casesReviewsRepository = new CasesReviewsRepository(
  postgresConnectionInstance.connection,
);
export { casesReviewsRepository, CasesReviewsRepository };
