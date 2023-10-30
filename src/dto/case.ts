import CaseStatuses from '@src/infrastructure/enums/caseStatuses';

class CaseDto {
  id: number;
  lawyerId: number;
  clientId: number;
  description: string;
  status: CaseStatuses;
  budget: number;
  startDate: Date;
  endDate: Date;

  constructor({
    id,
    lawyerId,
    clientId,
    description,
    status,
    budget,
    startDate,
    endDate,
  }) {
    this.id = id;
    this.lawyerId = lawyerId;
    this.clientId = clientId;
    this.description = description;
    this.status = status;
    this.budget = budget;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

class CreateCaseDto {
  lawyerId: number;
  clientId: number;
  description: string;
  status?: CaseStatuses;
  budget: number;
  startDate?: Date;
  endDate?: Date;

  constructor({
    lawyerId,
    clientId,
    description,
    status,
    budget,
    startDate,
    endDate,
  }) {
    this.lawyerId = lawyerId;
    this.clientId = clientId;
    this.description = description;
    this.status = status;
    this.budget = budget;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export { CaseDto, CreateCaseDto };
