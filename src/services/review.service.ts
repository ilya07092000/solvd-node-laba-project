import { CreateReviewDto, ReviewDto } from '@src/dto/review';
import HttpException from '@src/infrastructure/exceptions/httpException';
import {
  ReviewRepository,
  reviewRepository,
} from '@src/repositories/reviewRepository';

class ReviewService {
  private repository: ReviewRepository;
  private;

  constructor(repository: ReviewRepository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.getAll();
  }

  async getById({ id }: { id: number }) {
    const currReview = await this.repository.getById({ id });
    if (!currReview) {
      throw new HttpException(404, 'Review Does Not Exist!');
    }
    return currReview;
  }

  create(data: CreateReviewDto) {
    return this.repository.create(data);
  }

  async deleteById({ id }: { id: number }) {
    const reviewDto = await this.repository.deleteById({ id });
    if (!reviewDto) {
      throw new HttpException(404, 'Review Was Not Found');
    }
    return reviewDto;
  }

  async update({
    id,
    reviewInfo,
  }: {
    id: number;
    reviewInfo: Partial<ReviewDto>;
  }) {
    const isExistingReview = await this.getById({ id });

    if (!isExistingReview) {
      throw new HttpException(404, 'Review was not found');
    }
    return this.repository.update({ id, reviewInfo });
  }
}

const reviewService = new ReviewService(reviewRepository);
export { reviewService, ReviewService };
