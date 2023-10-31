import ConflictStatuses from '@src/infrastructure/enums/conflictStatuses';

class CreateConflictDto {
  caseId: number;
  reason: string;
  status?: ConflictStatuses;

  constructor({ caseId, reason, status }) {
    this.caseId = caseId;
    this.reason = reason;
    this.status = status;
  }
}

class ConflictDto {
  id: number;
  adminId: number;
  caseId: number;
  reason: string;
  status: ConflictStatuses;

  constructor({ caseId, reason, status, id, adminId }) {
    this.id = id;
    this.adminId = adminId;
    this.caseId = caseId;
    this.reason = reason;
    this.status = status;
  }
}

export { CreateConflictDto, ConflictDto };
