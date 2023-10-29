import HttpException from '@src/infrastructure/exceptions/httpException';
import { LawyerService, lawyerService } from './lawyer.service';
import { LicenseService, licenseService } from './license.service';

class LawyerLicenseService {
  private licenseService: LicenseService;
  private lawyerService: LawyerService;

  constructor(licenseService: LicenseService, lawyerService: LawyerService) {
    this.licenseService = licenseService;
    this.lawyerService = lawyerService;
  }

  async addLicense({ userId, info }: { userId: number; info: string }) {
    const lawyerByUserId = await this.lawyerService.getByUserId({ id: userId });
    if (!lawyerByUserId) {
      throw new HttpException(400, 'Lawyer Was Not Found!');
    }
    return this.licenseService.create({ lawyerId: lawyerByUserId.id, info });
  }

  async getAllLicenses({ lawyerId }: { lawyerId: number }) {
    return this.licenseService.getByLawyerId({ id: lawyerId });
  }
}

const lawyerLicenseService = new LawyerLicenseService(
  licenseService,
  lawyerService,
);
export { lawyerLicenseService, LawyerLicenseService };
