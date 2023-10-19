import {
  INumberSchema,
  IStringSchema,
  IValidationSchema,
  ValidationSchemaTypes,
} from '@src/infrastructure/interfaces/validation';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * returns an array of needed fields
 */
const checkMandatoryFields = ({
  fields = [],
  obj = {},
}: {
  fields: string[];
  obj: object;
}) => {
  const objKeys = Object.keys(obj);
  return fields.reduce((acc, currField) => {
    if (!objKeys.includes(currField)) {
      acc.push(currField);
    }
    return acc;
  }, []);
};

const validateByType = (value: any, schema: ValidationSchemaTypes) => {
  const validators = {
    string: stringChecker,
    email: emailChecker,
    number: numberChecker,
  };

  const validator = validators[schema.type];
  if (typeof validator === 'function') {
    return validator(value, schema as never);
  }

  return typeof value === schema.type;
};

const stringChecker = (value: any, schema: IStringSchema) => {
  if (schema.required && !value) {
    return 'value is required';
  }

  if (typeof value !== 'string') {
    return 'string type should be used for this field';
  }

  if (schema.maxLength && value.length >= schema.maxLength) {
    return `max length is ${schema.maxLength} symbols`;
  }

  if (schema.minLength && value.length < schema.minLength) {
    return `min length is ${schema.minLength} symbols`;
  }

  if (schema.includes && !schema.includes.includes(value)) {
    return `value should be ${schema.includes.join(' or ')}`;
  }
};

const numberChecker = (value: any, schema: INumberSchema) => {
  if (typeof value !== 'number') {
    return 'number type should be used for this field';
  }

  if (schema.required && !(!Math.abs(value) || value !== 0)) {
    return 'value is required';
  }

  if (schema.maxValue && value >= schema.maxValue) {
    return `max value is ${schema.maxValue}`;
  }

  if (schema.minValue && value < schema.minValue) {
    return `min value is ${schema.maxValue}`;
  }
};

const emailChecker = (value: any, schema: IStringSchema) => {
  if (schema.required && !value) {
    return 'value is required';
  }

  if (!value.match(emailRegex)) {
    return 'value is not valid';
  }
};

const validateObject = (obj: object, schema: IValidationSchema): string[] => {
  const errors = Object.keys(schema).reduce((result, key: string) => {
    const validationError = validateByType(obj[key], schema[key]);
    if (validationError) {
      result.push(`${key} ${validationError}`);
    }
    return result;
  }, []);
  return errors;
};

export { checkMandatoryFields, validateObject };
