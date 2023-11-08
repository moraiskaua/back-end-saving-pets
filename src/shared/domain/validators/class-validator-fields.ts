/* eslint-disable indent */
import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<ValidatedProps>
  implements ValidatorFieldsInterface<ValidatedProps>
{
  errors: FieldsErrors = null;
  validatedData: ValidatedProps = null;

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};

      for (const error of errors) {
        const fields = error.property;
        this.errors[fields] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
