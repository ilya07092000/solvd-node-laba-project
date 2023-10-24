import {
  RoleRepository,
  roleRepository,
} from '@src/repositories/roleRepository';

class RoleService {
  private repository: RoleRepository;

  constructor(repository: RoleRepository) {
    this.repository = repository;
  }

  getByType({ type }: { type: string }) {
    return this.repository.getByType({ type });
  }
}

const roleService = new RoleService(roleRepository);
export { roleService, RoleService };
