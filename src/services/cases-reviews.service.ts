import HttpException from '@src/infrastructure/exceptions/httpException';
import { CaseService, caseService } from './case.service';
import { ReviewService, reviewService } from './review.service';
import { CreateReviewDto } from '@src/dto/review';
import { RoleService, roleService } from './role.service';
import { UserService, userService } from './user.service';
import { LawyerService, lawyerService } from './lawyer.service';
import { ClientService, clientService } from './client.service';
import RoleTypes from '@src/infrastructure/enums/roles';
import {
  CasesReviewsRepository,
  casesReviewsRepository,
} from '@src/repositories/casesReviewRepository';

class CasesReviewsService {
  private repository: CasesReviewsRepository;
  private caseService: CaseService;
  private reviewService: ReviewService;
  private roleService: RoleService;
  private userService: UserService;
  private clientService: ClientService;
  private lawyerService: LawyerService;

  constructor(
    repository: CasesReviewsRepository,
    caseService: CaseService,
    reviewService: ReviewService,
    roleService: RoleService,
    userService: UserService,
    lawyerService: LawyerService,
    clientService: ClientService,
  ) {
    this.repository = repository;
    this.caseService = caseService;
    this.reviewService = reviewService;
    this.roleService = roleService;
    this.userService = userService;
    this.clientService = clientService;
    this.lawyerService = lawyerService;
  }

  async createReview({
    userId,
    caseId,
    data,
  }: {
    userId: number;
    caseId: number;
    data: CreateReviewDto;
  }) {
    const userInfo = await this.userService.getById({ id: userId });
    const userRoleInfo = await this.roleService.getById({
      id: userInfo.roleId,
    });
    const caseInfo = await this.caseService.getById({ id: caseId });

    let caseParticipant;
    if (userRoleInfo.type === RoleTypes.CLIENT) {
      caseParticipant = await this.clientService.getByUserId({ id: userId });
      if (caseInfo.clientId !== caseParticipant.id) {
        throw new HttpException(
          400,
          'You can not add review to this case because you are not participate in it!',
        );
      }
    } else {
      caseParticipant = await this.lawyerService.getByUserId({ id: userId });
      if (caseInfo.lawyerId !== caseParticipant.id) {
        throw new HttpException(
          400,
          'You can not add review to this case because you are not participate in it!',
        );
      }
    }

    const newReview = await this.reviewService.create({
      ...data,
      creator: userRoleInfo.type as RoleTypes.LAWYER | RoleTypes.CLIENT,
    });
    await this.repository.create({ caseId, reviewId: newReview.id });
    return newReview;
  }

  getCasesReviews({ caseId }) {
    return this.repository.getByCaseId({ id: caseId });
  }
}

const casesReviewsService = new CasesReviewsService(
  casesReviewsRepository,
  caseService,
  reviewService,
  roleService,
  userService,
  lawyerService,
  clientService,
);
export { casesReviewsService, CasesReviewsService };
