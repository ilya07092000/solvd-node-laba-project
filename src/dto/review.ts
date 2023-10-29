import RoleTypes from '@src/infrastructure/enums/roles';

class ReviewDto {
  id: number;
  rate: number;
  message: number;
  creator: RoleTypes.ADMIN | RoleTypes.CLIENT;

  constructor({ id, rate, message, creator }) {
    this.id = id;
    this.rate = rate;
    this.message = message;
    this.creator = creator;
  }
}

class CreateReviewDto {
  rate: number;
  message: number;
  creator: RoleTypes.ADMIN | RoleTypes.CLIENT;

  constructor({ rate, message, creator }) {
    this.rate = rate;
    this.message = message;
    this.creator = creator;
  }
}

export { ReviewDto, CreateReviewDto };
