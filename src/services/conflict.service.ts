import HttpException from '@src/infrastructure/exceptions/httpException';
import {
  ConflictRepository,
  conflictRepository,
} from '@src/repositories/conflictRepository';
import { ConflictDto, CreateConflictDto } from '@src/dto/conflict';
import { CaseService, caseService } from './case.service';
import ConflictStatuses from '@src/infrastructure/enums/conflictStatuses';

class ConflictService {
  private repository: ConflictRepository;
  private caseService: CaseService;

  constructor(repository: ConflictRepository, caseService: CaseService) {
    this.repository = repository;
    this.caseService = caseService;
  }

  getAll() {
    return this.repository.getAll();
  }

  getById({ id }: { id: number }) {
    return this.repository.getById({ id });
  }

  getByCaseId({ id }: { id: number }) {
    return this.repository.getByCaseId({ id });
  }

  async create(data: CreateConflictDto) {
    /**
     * CHECK WHETHER CASE WITH SUCH ID EXISTS
     */
    await this.caseService.getById({ id: data.caseId });

    return this.repository.create({
      status: ConflictStatuses.PROCESSING,
      ...data,
    });
  }

  async deleteById({ id }: { id: number }) {
    const conflictDto = await this.repository.deleteById({ id });
    if (!conflictDto) {
      throw new HttpException(404, 'Conflict Was Not Found');
    }
    return conflictDto;
  }

  async update({ id, data }: { id: number; data: Partial<ConflictDto> }) {
    const existingConflict = await this.repository.getById({ id });
    if (!existingConflict) {
      throw new HttpException(404, 'Conflict was not found');
    }
    return this.repository.updateById({ id, updatedConflict: data });
  }

  async fulfill({ id }) {
    return this.update({ id, data: { status: ConflictStatuses.FULFILLED } });
  }

  async reject({ id }) {
    return this.update({ id, data: { status: ConflictStatuses.REJECTED } });
  }
}

const conflictService = new ConflictService(conflictRepository, caseService);
export { conflictService, ConflictService };
