class LicenseDto {
  id: number;
  lawyerId: number;
  verificationId: number | null;
  info: string;

  constructor({ id, lawyerId, verificationId, info }) {
    this.id = id;
    this.lawyerId = lawyerId;
    this.verificationId = verificationId;
    this.info = info;
  }
}

class CreateLicenseDto {
  lawyerId: number;
  info: string;

  constructor({ lawyerId, info }) {
    this.lawyerId = lawyerId;
    this.info = info;
  }
}

export { LicenseDto, CreateLicenseDto };
