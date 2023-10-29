import HttpException from '@src/infrastructure/exceptions/httpException';
import { LawyerService, lawyerService } from './lawyer.service';
import {
  CaseRepository,
  caseRepository,
} from '@src/repositories/caseRepository';
import { CaseDto, CreateCaseDto } from '@src/dto/case';
import { ClientService, clientService } from './client.service';

class CaseService {
  private repository: CaseRepository;
  private lawyerService: LawyerService;
  private clientService: ClientService;

  constructor(
    repository: CaseRepository,
    lawyerService: LawyerService,
    clientService: ClientService,
  ) {
    this.repository = repository;
    this.lawyerService = lawyerService;
    this.clientService = clientService;
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

  getByClientId({ id }: { id: number }) {
    return this.repository.getByClientId({ id });
  }

  async create(data: CreateCaseDto) {
    try {
      /**
       * check whether lawyer exists
       */
      const lawyer = await this.lawyerService.getById({ id: data.lawyerId });
      if (!lawyer) {
        throw new HttpException(400, 'Lawyer Does Not Exist!');
      }

      /**
       * check whether client exists
       */
      const client = await this.clientService.getById({ id: data.clientId });
      if (!client) {
        throw new HttpException(400, 'Client Does Not Exist!');
      }
    } catch (e) {
      throw e;
    }

    return this.repository.create(data);
  }

  async deleteById({ id }: { id: number }) {
    const caseDto = await this.repository.deleteById({ id });
    if (!caseDto) {
      throw new HttpException(404, 'Case Was Not Found');
    }
    return caseDto;
  }

  async update({ id, caseInfo }: { id: number; caseInfo: Partial<CaseDto> }) {
    const isExistingCase = await this.repository.getById({ id });

    if (!isExistingCase) {
      throw new HttpException(404, 'Case was not found');
    }
    return this.repository.update({ id, caseInfo });
  }
}

const caseService = new CaseService(
  caseRepository,
  lawyerService,
  clientService,
);
export { caseService, CaseService };
