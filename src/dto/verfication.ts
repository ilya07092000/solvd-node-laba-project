import VerificationStatuses from '@src/infrastructure/enums/verificationStatuses';

class VerificationDto {
  id: number;
  verifierId: number;
  date: string;
  notes: string;
  status: VerificationStatuses;

  constructor({ id, verifierId, date, notes, status }) {
    this.id = id;
    this.verifierId = verifierId;
    this.date = date;
    this.notes = notes;
    this.status = status;
  }
}

class CreateVerificationDto {
  verifierId: number;
  notes: string;
  status: VerificationStatuses;

  constructor({ verifierId, notes, status }) {
    this.verifierId = verifierId;
    this.notes = notes;
    this.status = status;
  }
}

export { VerificationDto, CreateVerificationDto };
