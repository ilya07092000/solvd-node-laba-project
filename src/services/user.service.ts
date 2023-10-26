import {
  UserRepository,
  userRepository,
} from '@src/repositories/userRepository';
import { RoleService, roleService } from './role.service';
import HttpException from '@src/infrastructure/exceptions/httpException';
import { CreateUserDto, UserDto } from '@src/dto/user';
import { AuthService, authService } from '@src/services/auth.service';

class UserService {
  private repository: UserRepository;
  private roleService: RoleService;
  private authService: AuthService;

  constructor(
    repository: UserRepository,
    roleService: RoleService,
    authService: AuthService,
  ) {
    this.repository = repository;
    this.roleService = roleService;
    this.authService = authService;
  }

  getAll() {
    return this.repository.getAll();
  }

  getByEmail({ email }: { email: string }) {
    return this.repository.getByEmail({ email });
  }

  async deleteById({ id, currUserId }: { id: number; currUserId: number }) {
    if (id === currUserId) {
      throw new HttpException(400, 'You can not delete yourself!');
    }

    const userDto = await this.repository.deleteById({ id });
    if (!userDto) {
      throw new HttpException(404, 'User Was Not Found');
    }
    return userDto;
  }

  async getById({ id }: { id: number }) {
    const user = await this.repository.getById({ id });
    if (!user) {
      throw new HttpException(404, 'User Was Not Found');
    }
    return user.dto;
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    const roleInfo = await this.roleService.getById({ id: data.roleId });
    if (!roleInfo) {
      throw new HttpException(400, 'Role Does Not Exist');
    }
    return this.repository.create(data);
  }

  async update(id: number, data: CreateUserDto) {
    const updatedUser = { ...data };

    const verifyUser = await this.getById({ id });
    if (!verifyUser) {
      throw new HttpException(404, 'User Does Not Exist');
    }

    if (updatedUser.roleId) {
      const roleInfo = await this.roleService.getById({ id: data.roleId });
      if (!roleInfo) {
        throw new HttpException(400, 'Role Does Not Exist');
      }
    }

    if (updatedUser.password) {
      const hashedPassword = await this.authService.getHashedPassword({
        password: updatedUser.password,
      });
      updatedUser.password = hashedPassword;
    }

    const userDto = await this.repository.updateById({
      id,
      updatedUser,
    });
    return userDto.dto;
  }
}

const userService = new UserService(userRepository, roleService, authService);
export { userService, UserService };
