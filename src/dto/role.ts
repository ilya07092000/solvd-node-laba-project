class RoleDto {
  id: number;
  type: string;

  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }
}

export { RoleDto };
