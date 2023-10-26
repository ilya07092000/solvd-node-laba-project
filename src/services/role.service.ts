import HttpException from '@src/infrastructure/exceptions/httpException';
import {
  RoleRepository,
  roleRepository,
} from '@src/repositories/roleRepository';

class RoleService {
  private repository: RoleRepository;

  constructor(repository: RoleRepository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.getAll();
  }

  async update({ id, type }: { id: number; type: string }) {
    const roleExists = await this.getById({ id });
    if (!roleExists) {
      throw new HttpException(404, 'Role Does not Exist');
    }
    return this.repository.update({ id, type });
  }

  async deleteById({ id }: { id: number }) {
    const roleExists = await this.getById({ id });
    if (!roleExists) {
      throw new HttpException(404, 'Role Does not Exist');
    }
    return this.repository.deleteById({ id });
  }

  getByType({ type }: { type: string }) {
    return this.repository.getByType({ type });
  }

  async create({ type }: { type: string }) {
    const roleExists = this.getByType({ type });
    if (roleExists) {
      throw new HttpException(400, 'Role Already Exists');
    }
    return this.repository.create({ type });
  }

  getById({ id }: { id: number }) {
    return this.repository.getById({ id });
  }
}

const roleService = new RoleService(roleRepository);
export { roleService, RoleService };
