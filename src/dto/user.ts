class UserDto {
  email: string;
  role: string;
  city: string;
  firstName: string;
  lastName: string;
  id: number;

  constructor({ email, role, city, password, firstName, lastName, id }) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.city = city;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class CreateUserDto {
  email: string;
  roleId: number;
  city: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor({ email, roleId, city, password, firstName, lastName }) {
    this.email = email;
    this.roleId = roleId;
    this.city = city;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export { UserDto, CreateUserDto };
