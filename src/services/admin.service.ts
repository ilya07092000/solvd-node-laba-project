import HttpException from '@src/infrastructure/exceptions/httpException';
import { UserService, userService } from './user.service';
import { RoleService, roleService } from './role.service';
import RoleTypes from '@src/infrastructure/enums/roles';
import {
  AdminRepository,
  adminRepository,
} from '@src/repositories/adminRepository';
import { CreateAdminDto } from '@src/dto/admin';

class AdminService {
  private repository: AdminRepository;
  private userService: UserService;
  private roleService: RoleService;

  constructor(
    repository: AdminRepository,
    userService: UserService,
    roleService: RoleService,
  ) {
    this.repository = repository;
    this.userService = userService;
    this.roleService = roleService;
  }

  getAll() {
    return this.repository.getAll();
  }

  getById({ id }: { id: number }) {
    return this.repository.getById({ id });
  }

  getByUserId({ id }: { id: number }) {
    return this.repository.getByUserId({ id });
  }

  async create(data: CreateAdminDto) {
    try {
      /**
       * check whether user exists
       * and whether role is admin
       */
      const user = await this.userService.getById({ id: data.userId });
      const userRole = await this.roleService.getById({ id: user.roleId });
      if (userRole.type !== RoleTypes.ADMIN) {
        throw new HttpException(400, 'User role is not suitable for this!');
      }
    } catch (e) {
      throw e;
    }

    /**
     * check whether lawyer record already has reference to this user
     */
    const adminByUserId = await this.repository.getByUserId({
      id: data.userId,
    });
    if (adminByUserId) {
      throw new HttpException(400, 'User is admin already');
    }

    return this.repository.create(
      new CreateAdminDto({ ...data, isActive: false }),
    );
  }

  async deleteById({ id, currUserId }: { id: number; currUserId: number }) {
    /**
     * prevent deleting yourself
     */
    if (id === currUserId) {
      throw new HttpException(400, 'You can not delete yourself!');
    }

    const adminDto = await this.repository.deleteById({ id });
    if (!adminDto) {
      throw new HttpException(404, 'Admin Was Not Found');
    }
    return adminDto;
  }

  async update({ id, isActive }: { id: number; isActive: boolean }) {
    const isExistingAdmin = await this.repository.getById({ id });

    if (!isExistingAdmin) {
      throw new HttpException(404, 'Admin was not found');
    }
    return this.repository.update({ id, isActive });
  }
}

const adminService = new AdminService(
  adminRepository,
  userService,
  roleService,
);
export { adminService, AdminService };
