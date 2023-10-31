import { CreateConflictDto } from '@src/dto/conflict';
import HttpException from '@src/infrastructure/exceptions/httpException';
import { ClientService, clientService } from './client.service';
import { CaseService, caseService } from './case.service';
import { ConflictService, conflictService } from './conflict.service';

class CasesConflictsService {
  private clientService: ClientService;
  private caseService: CaseService;
  private conflictService: ConflictService;

  constructor(
    clientService: ClientService,
    caseService: CaseService,
    conflictService: ConflictService,
  ) {
    this.clientService = clientService;
    this.caseService = caseService;
    this.conflictService = conflictService;
  }

  async createConflict(userId: number, data: CreateConflictDto) {
    const clientInfo = await this.clientService.getByUserId({ id: userId });
    if (!clientInfo) {
      throw new HttpException(404, 'Client Was Not Found!');
    }

    const caseInfo = await this.caseService.getByClientId({
      id: clientInfo.id,
    });
    if (!caseInfo) {
      throw new HttpException(404, 'Case Was Not Found!');
    }

    return this.conflictService.create(data);
  }

  getCaseConflicts({ caseId }) {
    return this.conflictService.getByCaseId({ id: caseId });
  }
}

const casesConflictsService = new CasesConflictsService(
  clientService,
  caseService,
  conflictService,
);
export { casesConflictsService, CasesConflictsService };
