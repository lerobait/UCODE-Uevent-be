import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function AtLeastOneOf(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const object = args.object as Record<string, any>;
          return properties.some(
            (prop) => object[prop] !== undefined && object[prop] !== null,
          );
        },
        defaultMessage() {
          return `At least one of the following properties must be defined: ${properties.join(', ')}`;
        },
      },
    });
  };
}
