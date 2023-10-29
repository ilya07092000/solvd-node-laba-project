import HttpException from '@src/infrastructure/exceptions/httpException';
import { LawyerService, lawyerService } from './lawyer.service';
import {
  VerificationRepository,
  verificationRepository,
} from '@src/repositories/verificationRepository';
import { CreateVerificationDto, VerificationDto } from '@src/dto/verfication';
import { AdminService, adminService } from './admin.service';

class VerificationService {
  private repository: VerificationRepository;
  private adminService: AdminService;

  constructor(repository: VerificationRepository, adminService: AdminService) {
    this.repository = repository;
    this.adminService = adminService;
  }

  getAll() {
    return this.repository.getAll();
  }

  getById({ id }: { id: number }) {
    return this.repository.getById({ id });
  }

  async create(data: CreateVerificationDto) {
    if (data.verifierId) {
      const admin = await this.adminService.getById({ id: data.verifierId });
      if (!admin) {
        throw new HttpException(400, 'Admin Does Not Exist!');
      }
    }

    return this.repository.create(
      new CreateVerificationDto({
        ...data,
        verifierId: data?.verifierId || null,
      }),
    );
  }

  async deleteById({ id }: { id: number }) {
    const verificationDto = await this.repository.deleteById({ id });
    if (!verificationDto) {
      throw new HttpException(404, 'License Was Not Found');
    }
    return verificationDto;
  }

  async update({
    id,
    verificationInfo,
  }: {
    id: number;
    verificationInfo: Partial<VerificationDto>;
  }) {
    const isExistingVerification = await this.repository.getById({ id });

    if (!isExistingVerification) {
      throw new HttpException(404, 'Verification was not found');
    }

    if (verificationInfo.verifierId) {
      const lawyer = await this.adminService.getById({
        id: verificationInfo.verifierId,
      });
      if (!lawyer) {
        throw new HttpException(404, 'Admin Does Not Exist!');
      }
    }

    return this.repository.update({ id, verificationInfo });
  }
}

const verificationService = new VerificationService(
  verificationRepository,
  adminService,
);
export { verificationService, VerificationService };
