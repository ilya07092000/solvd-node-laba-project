class AdminDto {
  id: number;
  userId: number;
  isActive: boolean;

  constructor({ id, userId, isActive }) {
    this.id = id;
    this.userId = userId;
    this.isActive = isActive;
  }
}

class CreateAdminDto {
  userId: number;
  isActive: boolean;

  constructor({ userId, isActive }) {
    this.userId = userId;
    this.isActive = isActive;
  }
}

export { AdminDto, CreateAdminDto };
