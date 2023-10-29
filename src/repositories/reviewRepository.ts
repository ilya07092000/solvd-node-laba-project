import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { CreateReviewDto, ReviewDto } from '@src/dto/review';

class ReviewRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  async getAll(): Promise<null | ReviewDto[]> {
    const req = await this.connection.query(
      ` SELECT id, rate, message, creator
        FROM review
      `,
    );
    const data = req.rows;

    return data ? data.map((review) => new ReviewDto(review)) : null;
  }

  async getById({ id }: { id: number }): Promise<null | ReviewDto> {
    const req = await this.connection.query(
      ` SELECT id, rate, message, creator
        FROM review
        WHERE id = $1
      `,
      [id],
    );
    const data = req.rows[0];

    return data ? new ReviewDto(data) : null;
  }

  async create(inputData: CreateReviewDto): Promise<null | ReviewDto> {
    const req = await this.connection.query(
      ` INSERT INTO review (rate, message, creator) 
        VALUES($1, $2, $3) 
        RETURNING *
      `,
      [inputData.rate, inputData.message, inputData.creator],
    );

    const data = req.rows[0];

    return data ? new ReviewDto(data) : null;
  }

  async deleteById({ id }: { id: number }): Promise<null | ReviewDto> {
    const req = await this.connection.query(
      `DELETE FROM review WHERE id = $1 RETURNING *`,
      [id],
    );
    const data = req.rows[0];

    return data ? new ReviewDto(data) : null;
  }

  async update({
    id,
    reviewInfo,
  }: {
    id: number;
    reviewInfo: Partial<ReviewDto>;
  }): Promise<null | ReviewDto> {
    const currReview = await this.getById({ id });
    const mixedReview = {
      ...currReview,
      ...reviewInfo,
    };

    const req = await this.connection.query(
      ` UPDATE review 
        SET rate = $1,
            message = $2
        WHERE id = $3
        RETURNING *
      `,
      [mixedReview.rate, mixedReview.message, id],
    );

    const data = req.rows[0];

    return data ? new ReviewDto(data) : null;
  }
}

const reviewRepository = new ReviewRepository(
  postgresConnectionInstance.connection,
);
export { reviewRepository, ReviewRepository };
