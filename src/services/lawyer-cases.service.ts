import HttpException from '@src/infrastructure/exceptions/httpException';
import { CaseService, caseService } from './case.service';
import { LawyerService, lawyerService } from './lawyer.service';
import CaseStatuses from '@src/infrastructure/enums/caseStatuses';

class LawyerCasesService {
  private caseService: CaseService;
  private lawyerService: LawyerService;

  constructor(caseService: CaseService, lawyerService: LawyerService) {
    this.caseService = caseService;
    this.lawyerService = lawyerService;
  }

  async checkLawyerPermission({
    caseId,
    userId,
  }: {
    caseId: number;
    userId: number;
  }) {
    /**
     * check whether layer exists
     */
    const lawyerInfo = await this.lawyerService.getByUserId({ id: userId });
    if (!lawyerInfo) {
      throw new HttpException(400, 'Lawyer Was Not Found');
    }

    /**
     * check whether layer available
     */
    if (!lawyerInfo.available) {
      throw new HttpException(400, 'Lawyer Is Not Available');
    }

    /**
     * check whether lawyer belongs to the case
     */
    const caseInfo = await this.caseService.getById({ id: caseId });
    if (caseInfo.lawyerId !== lawyerInfo.id) {
      throw new HttpException(400, 'It is not your case!');
    }
    return true;
  }

  async admitCase(userId: number, caseId: number) {
    await this.checkLawyerPermission({ userId, caseId });
    return this.caseService.startCase({ id: caseId });
  }

  async rejectCase(userId: number, caseId: number) {
    await this.checkLawyerPermission({ userId, caseId });
    return this.caseService.rejectCase({ id: caseId });
  }

  async fulfillCase(userId: number, caseId: number) {
    await this.checkLawyerPermission({ userId, caseId });
    return this.caseService.fulfillCase({ id: caseId });
  }

  async getLawyerCases({ lawyerId }) {
    const lawyer = await this.lawyerService.getById({ id: lawyerId });
    if (!lawyer) {
      throw new HttpException(404, 'Lawyer Was Not Found!');
    }

    return this.caseService.getByLawyerId({ id: lawyerId });
  }
}

const lawyerCasesService = new LawyerCasesService(caseService, lawyerService);
export { lawyerCasesService, LawyerCasesService };
