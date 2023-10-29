import HttpException from '@src/infrastructure/exceptions/httpException';
import { CaseService, caseService } from './case.service';
import { LawyerService, lawyerService } from './lawyer.service';

class LawyerCasesService {
  private caseService: CaseService;
  private lawyerService: LawyerService;

  constructor(caseService: CaseService, lawyerService: LawyerService) {
    this.caseService = caseService;
    this.lawyerService = lawyerService;
  }

  async admitCase(userId: number, caseId: number) {
    const lawyerInfo = await this.lawyerService.getByUserId({ id: userId });
    if (!lawyerInfo) {
      throw new HttpException(400, 'Lawyer Was Not Found');
    }

    if (!lawyerInfo.available) {
      throw new HttpException(400, 'Lawyer Is Not Available');
    }
    return this.caseService.startCase({ id: caseId });
  }

  async rejectCase(userId: number, caseId: number) {
    const lawyerInfo = await this.lawyerService.getByUserId({ id: userId });
    if (!lawyerInfo) {
      throw new HttpException(400, 'Lawyer Was Not Found');
    }

    if (!lawyerInfo.available) {
      throw new HttpException(400, 'Lawyer Is Not Available');
    }
    return this.caseService.rejectCase({ id: caseId });
  }

  async fulfillCase(userId: number, caseId: number) {
    const lawyerInfo = await this.lawyerService.getByUserId({ id: userId });
    if (!lawyerInfo) {
      throw new HttpException(400, 'Lawyer Was Not Found');
    }

    if (!lawyerInfo.available) {
      throw new HttpException(400, 'Lawyer Is Not Available');
    }
    return this.caseService.fulfillCase({ id: caseId });
  }

  getLawyerCases({ lawyerId }) {
    return this.caseService.getByLawyerId({ id: lawyerId });
  }
}

const lawyerCasesService = new LawyerCasesService(caseService, lawyerService);
export { lawyerCasesService, LawyerCasesService };
