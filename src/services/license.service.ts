import HttpException from '@src/infrastructure/exceptions/httpException';
import {
  LicenseRepository,
  licenseRepository,
} from '@src/repositories/licenseRepository';
import { CreateLicenseDto, LicenseDto } from '@src/dto/license';
import { LawyerService, lawyerService } from './lawyer.service';
import {
  VerificationService,
  verificationService,
} from './verification.service';
import VerificationStatuses from '@src/infrastructure/enums/verificationStatuses';
import { AdminService, adminService } from './admin.service';

class LicenseService {
  private repository: LicenseRepository;
  private lawyerService: LawyerService;
  private verificationService: VerificationService;
  private adminService: AdminService;

  constructor(
    repository: LicenseRepository,
    lawyerService: LawyerService,
    verificationService: VerificationService,
    adminService: AdminService,
  ) {
    this.repository = repository;
    this.lawyerService = lawyerService;
    this.verificationService = verificationService;
    this.adminService = adminService;
  }

  getAll() {
    return this.repository.getAll();
  }

  getById({ id }: { id: number }) {
    return this.repository.getById({ id });
  }

  getByLawyerId({ id }: { id: number }) {
    return this.repository.getBylawyerId({ id });
  }

  async create(data: CreateLicenseDto) {
    try {
      /**
       * check whether lawyer exists
       */
      const lawyer = await this.lawyerService.getById({ id: data.lawyerId });
      if (!lawyer) {
        throw new HttpException(400, 'Lawyer Does Not Exist!');
      }
    } catch (e) {
      throw e;
    }

    return this.repository.create(new CreateLicenseDto({ ...data }));
  }

  async deleteById({ id }: { id: number }) {
    const licenseDto = await this.repository.deleteById({ id });
    if (!licenseDto) {
      throw new HttpException(404, 'License Was Not Found');
    }
    return licenseDto;
  }

  async update({
    id,
    licenseInfo,
  }: {
    id: number;
    licenseInfo: Partial<LicenseDto>;
  }) {
    const isExistingLicense = await this.repository.getById({ id });

    if (licenseInfo.lawyerId) {
      const lawyer = await this.lawyerService.getById({
        id: licenseInfo.lawyerId,
      });
      if (!lawyer) {
        throw new HttpException(404, 'Lawyer Does Not Exist!');
      }
    }

    if (!isExistingLicense) {
      throw new HttpException(404, 'License was not found');
    }
    return this.repository.update({ id, licenseInfo });
  }

  async updateLicenseVerification({
    id,
    adminId,
    notes,
    status,
  }: {
    id: number;
    adminId: number;
    notes: string;
    status: VerificationStatuses;
  }) {
    /**
     * double check for existing admin before proceed with furher actions
     */
    const existingAdmin = await this.adminService.getByUserId({ id: adminId });
    if (!existingAdmin) {
      throw new HttpException(401, 'Admin does not exist');
    }

    /**
     * check whether license exist
     */
    const existingLicense = await this.getById({ id });
    if (!existingLicense) {
      throw new HttpException(404, 'License Does Not Exist!');
    }

    /**
     * update verification data if license already has verification
     */
    if (existingLicense.verificationId) {
      await this.verificationService.update({
        id: existingLicense.verificationId,
        verificationInfo: {
          status,
          notes,
        },
      });
      return this.getById({ id });
    }

    /**
     * create new verification and update license with it
     * in case if verification does not exist yet
     */
    const newVerification = await this.verificationService.create({
      verifierId: existingAdmin.id,
      status,
      notes,
    });
    return this.update({
      id,
      licenseInfo: { verificationId: newVerification.id },
    });
  }

  async verify({
    id,
    adminId,
    notes,
  }: {
    id: number;
    adminId: number;
    notes: string;
  }) {
    return this.updateLicenseVerification({
      id,
      adminId,
      notes,
      status: VerificationStatuses.VERIFIED,
    });
  }

  async reject({
    id,
    adminId,
    notes,
  }: {
    id: number;
    adminId: number;
    notes: string;
  }) {
    return this.updateLicenseVerification({
      id,
      adminId,
      notes,
      status: VerificationStatuses.REJECTED,
    });
  }
}

const licenseService = new LicenseService(
  licenseRepository,
  lawyerService,
  verificationService,
  adminService,
);
export { licenseService, LicenseService };
