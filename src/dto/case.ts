import { CaseStatus } from 'aws-sdk/clients/support';

class CaseDto {
  id: number;
  lawyerId: number;
  clientId: number;
  description: string;
  status: CaseStatus;
  budget: number;
  startDate: string;
  endDate: string;

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
  status?: CaseStatus;
  budget: number;
  startDate?: string;
  endDate?: string;

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
