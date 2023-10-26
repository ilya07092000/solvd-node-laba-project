class LawyerDto {
  id: number;
  userId: number;
  occupation: string;
  price: number;
  experience: string;
  available: boolean;

  constructor({ id, userId, occupation, price, experience, available }) {
    this.id = id;
    this.userId = userId;
    this.occupation = occupation;
    this.price = price;
    this.experience = experience;
    this.available = available;
  }
}

class CreateLawyerDto {
  userId: number;
  occupation?: string;
  price?: number;
  experience?: string;
  available?: boolean;

  constructor({
    userId,
    occupation,
    price,
    experience,
    available,
  }: {
    userId: number;
    occupation?: string;
    price?: number;
    experience?: string;
    available?: boolean;
  }) {
    this.userId = userId;
    this.occupation = occupation;
    this.price = price;
    this.experience = experience;
    this.available = available;
  }
}

export { LawyerDto, CreateLawyerDto };
