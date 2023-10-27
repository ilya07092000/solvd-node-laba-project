import HttpException from '@src/infrastructure/exceptions/httpException';
import {
  LawyerRepository,
  lawyerRepository,
} from '@src/repositories/lawyerRepository';
import { CreateLawyerDto } from '@src/dto/lawyer';
import { UserService, userService } from './user.service';
import { RoleService, roleService } from './role.service';
import RoleTypes from '@src/infrastructure/enums/roles';

class LawyerService {
  private repository: LawyerRepository;
  private userService: UserService;
  private roleService: RoleService;

  constructor(
    repository: LawyerRepository,
    userService: UserService,
    roleService: RoleService,
  ) {
    this.repository = repository;
    this.userService = userService;
    this.roleService = roleService;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getById({ id }: { id: number }) {
    const lawyer = await this.repository.getById({ id });
    if (!lawyer) {
      throw new HttpException(404, 'Lawyer Was Not Found');
    }
    return lawyer;
  }

  async create(data: CreateLawyerDto) {
    try {
      /**
       * check whether user exists
       * and whether role is lawyer
       */
      const user = await this.userService.getById({ id: data.userId });
      const userRole = await this.roleService.getById({ id: user.roleId });
      if (userRole.type !== RoleTypes.LAWYER) {
        throw new HttpException(400, 'User role is not suitable for this!');
      }
    } catch (e) {
      throw e;
    }

    /**
     * check whether lawyer record already has reference to this user
     */
    const lawyerByUserId = await this.repository.getByUserId({
      id: data.userId,
    });
    if (lawyerByUserId) {
      throw new HttpException(400, 'User has lawyer reference already');
    }

    return this.repository.create(data);
  }

  async deleteById({ id, currUserId }: { id: number; currUserId: number }) {
    if (id === currUserId) {
      throw new HttpException(400, 'You can not delete yourself!');
    }

    const lawyerDto = await this.repository.deleteById({ id });
    if (!lawyerDto) {
      throw new HttpException(404, 'Lawyer Was Not Found');
    }
    return lawyerDto;
  }

  async update({ id, data }: { id: number; data: Partial<CreateLawyerDto> }) {
    await this.getById({ id });
    return this.repository.updateById({ id, updatedLawyer: data });
  }
}

const lawyerService = new LawyerService(
  lawyerRepository,
  userService,
  roleService,
);
export { lawyerService, LawyerService };
