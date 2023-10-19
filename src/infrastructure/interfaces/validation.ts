interface IValidationSchema {
  [key: string]: ValidationSchemaTypes;
}

type ValidationSchemaTypes = IStringSchema | IEmailSchema | INumberSchema;

interface IBasicSchema<T> {
  type: T;
  required: boolean;
}

interface IStringSchema extends IBasicSchema<'string'> {
  minLength?: number;
  maxLength?: number;
  includes?: string[];
}

interface IEmailSchema extends IBasicSchema<'email'> {}

interface INumberSchema extends IBasicSchema<'number'> {
  minValue?: number;
  maxValue?: number;
}

export {
  IValidationSchema,
  IEmailSchema,
  INumberSchema,
  IStringSchema,
  ValidationSchemaTypes,
};
