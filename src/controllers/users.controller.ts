import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { userService } from '@src/services/user.service';

class UsersConroller {
  async getAll(req, res, next) {
    try {
      const result = await userService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await userService.getById({ id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        email: {
          required: true,
          type: 'email',
        },
        password: {
          type: 'string',
          required: true,
          minLength: 6,
        },
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          required: true,
        },
        roleId: {
          required: true,
          type: 'number',
          minValue: 0,
        },
        city: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await userService.create(body);

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const id = req.params.id;
      const errors = validateObject(body, {
        email: {
          required: false,
          type: 'email',
        },
        password: {
          type: 'string',
          required: false,
          minLength: 6,
        },
        firstName: {
          type: 'string',
          required: false,
        },
        lastName: {
          type: 'string',
          required: false,
        },
        roleId: {
          required: true,
          type: 'number',
          minValue: 0,
        },
        city: {
          required: false,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await userService.update(id, body);

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await userService.deleteById({
        id: +id,
        currUserId: req?.userInfo?.id || null,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new UsersConroller();
