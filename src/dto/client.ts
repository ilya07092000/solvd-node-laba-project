class ClientDto {
  id: number;
  userId: number;
  budget: number;

  constructor({ id, userId, budget }) {
    this.id = id;
    this.userId = userId;
    this.budget = budget;
  }
}

class CreateClientDto {
  userId: number;
  budget?: number;

  constructor({ userId, budget }) {
    this.userId = userId;
    this.budget = budget;
  }
}

export { ClientDto, CreateClientDto };
