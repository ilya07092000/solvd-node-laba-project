import HttpException from '@src/infrastructure/exceptions/httpException';
import { ClientService, clientService } from './client.service';
import { LawyerService, lawyerService } from './lawyer.service';
import { RoleService, roleService } from './role.service';
import { UserService, userService } from './user.service';
import RoleTypes from '@src/infrastructure/enums/roles';
import { AdminService, adminService } from './admin.service';

class ProfileService {
  private userService: UserService;
  private lawyerService: LawyerService;
  private clientService: ClientService;
  private roleService: RoleService;
  private adminService: AdminService;

  constructor(
    userService: UserService,
    lawyerService: LawyerService,
    clientService: ClientService,
    roleService: RoleService,
    adminService: AdminService,
  ) {
    this.userService = userService;
    this.lawyerService = lawyerService;
    this.clientService = clientService;
    this.roleService = roleService;
    this.adminService = adminService;
  }

  async getProfile({ userId }) {
    const userInfo = await this.userService.getById({ id: userId });
    if (!userInfo) {
      throw new HttpException(404, 'User Was Not Found!');
    }

    let entityData;
    const userRole = await this.roleService.getById({ id: userInfo.roleId });
    if (userRole.type === RoleTypes.ADMIN) {
      entityData = await this.adminService.getByUserId({ id: userId });
    } else if (userRole.type === RoleTypes.CLIENT) {
      entityData = await this.clientService.getByUserId({ id: userId });
    } else if (userRole.type === RoleTypes.LAWYER) {
      entityData = await this.lawyerService.getByUserId({ id: userId });
    }

    return {
      ...userInfo,
      [userRole.type]: {
        ...entityData,
      },
    };
  }
}

const profileService = new ProfileService(
  userService,
  lawyerService,
  clientService,
  roleService,
  adminService,
);

export { profileService, ProfileService };
