import { validateObject } from '@src/helpers/validation';
import RoleTypes from '@src/infrastructure/enums/roles';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { roleService } from '@src/services/role.service';

class RolesController {
  async getAll(req, res, next) {
    try {
      const result = await roleService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await roleService.getById({ id: req.params.id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        type: {
          required: true,
          type: 'string',
          includes: [RoleTypes.ADMIN, RoleTypes.CLIENT, RoleTypes.LAWYER],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await roleService.create({ type: body.type });

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        type: {
          required: true,
          type: 'string',
          includes: [RoleTypes.ADMIN, RoleTypes.CLIENT, RoleTypes.LAWYER],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await roleService.update({
        id: req.params.id,
        type: body.type,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await roleService.deleteById({ id: req.params.id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new RolesController();
