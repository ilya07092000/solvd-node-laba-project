import HttpException from '@src/infrastructure/exceptions/httpException';
import { CaseService, caseService } from './case.service';
import { CreateCaseDto } from '@src/dto/case';
import { ClientService, clientService } from './client.service';

class ClientCasesService {
  private caseService: CaseService;
  private clientService: ClientService;

  constructor(caseService: CaseService, clientService: ClientService) {
    this.caseService = caseService;
    this.clientService = clientService;
  }

  async createCase(userId: number, data: CreateCaseDto) {
    /**
     * get client record by user id
     */
    const clientInfo = await this.clientService.getByUserId({
      id: userId,
    });

    /**
     * add client id to data
     */
    const newCase = await this.caseService.create({
      ...data,
      clientId: clientInfo.id,
    });
    if (!newCase) {
      throw new HttpException(500, 'Smth Went Wrong');
    }

    /**
     * reduce client's budget amount after case creation
     */
    await this.clientService.update({
      id: clientInfo.id,
      budget: clientInfo.budget - newCase.budget,
    });

    return newCase;
  }

  getClientCases({ clientId }) {
    return this.caseService.getByClientId({ id: clientId });
  }
}

const clientCasesService = new ClientCasesService(caseService, clientService);
export { clientCasesService, ClientCasesService };
