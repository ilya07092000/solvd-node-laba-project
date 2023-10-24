import {
  UserRepository,
  userRepository,
} from '@src/repositories/userRepository';
import { RoleService, roleService } from './role.service';
import HttpException from '@src/infrastructure/exceptions/httpException';
import { CreateUserDto, UserDto } from '@src/dto/user';

class UserService {
  private repository: UserRepository;
  private roleService: RoleService;

  constructor(repository: UserRepository, roleService: RoleService) {
    this.repository = repository;
    this.roleService = roleService;
  }

  getByEmail({ email }: { email: string }) {
    return this.repository.getByEmail({ email });
  }

  async create(data: UserDto & { password: string }): Promise<UserDto> {
    const roleInfo = await this.roleService.getByType({ type: data.role });
    if (typeof roleInfo.id !== 'number') {
      throw new HttpException(400, 'Role Does Not Exist');
    }
    return this.repository.create(
      new CreateUserDto({ ...data, roleId: roleInfo.id }),
    );
  }
}

const userService = new UserService(userRepository, roleService);
export { userService, UserService };
