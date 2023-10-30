class CasesReviewsDto {
  id;
  rate;
  message;
  creator;

  constructor({ id, rate, message, creator }) {
    this.id = id;
    this.rate = rate;
    this.message;
    this.creator = creator;
  }
}

class CreateCasesReviewsDto {
  caseId;
  reviewId;

  constructor({ caseId, reviewId }) {
    this.caseId = caseId;
    this.reviewId = reviewId;
  }
}

export { CreateCasesReviewsDto, CasesReviewsDto };
