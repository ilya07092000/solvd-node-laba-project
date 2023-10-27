import HttpException from '@src/infrastructure/exceptions/httpException';
import { UserService, userService } from './user.service';
import { RoleService, roleService } from './role.service';
import RoleTypes from '@src/infrastructure/enums/roles';
import {
  ClientRepository,
  clientRepository,
} from '@src/repositories/clientRepository';
import { CreateClientDto } from '@src/dto/client';

class ClientService {
  private repository: ClientRepository;
  private userService: UserService;
  private roleService: RoleService;

  constructor(
    repository: ClientRepository,
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

  async create(data: CreateClientDto) {
    try {
      /**
       * check whether user exists
       * and whether role is client
       */
      const user = await this.userService.getById({ id: data.userId });
      const userRole = await this.roleService.getById({ id: user.roleId });
      if (userRole.type !== RoleTypes.CLIENT) {
        throw new HttpException(400, 'User role is not suitable for this!');
      }
    } catch (e) {
      throw e;
    }

    /**
     * check whether lawyer record already has reference to this user
     */
    const clientByUserId = await this.repository.getByUserId({
      id: data.userId,
    });
    if (clientByUserId) {
      throw new HttpException(400, 'User is client already');
    }

    return this.repository.create(new CreateClientDto({ budget: 0, ...data }));
  }

  async deleteById({ id, currUserId }: { id: number; currUserId: number }) {
    /**
     * prevent deleting yourself
     */
    if (id === currUserId) {
      throw new HttpException(400, 'You can not delete yourself!');
    }

    const clientDto = await this.repository.deleteById({ id });
    if (!clientDto) {
      throw new HttpException(404, 'Client Was Not Found');
    }
    return clientDto;
  }

  async update({ id, budget }: { id: number; budget: number }) {
    const isExistingClient = await this.repository.getById({ id });

    if (!isExistingClient) {
      throw new HttpException(404, 'Client was not found');
    }
    return this.repository.update({ id, budget });
  }
}

const clientService = new ClientService(
  clientRepository,
  userService,
  roleService,
);
export { clientService, ClientService };
