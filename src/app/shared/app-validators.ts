import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

// https://emailregex.com/
/* tslint:disable:max-line-length */
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* tslint:enable:max-line-length */

export class AppValidators {
  static get email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value || null) && EMAIL_REGEXP.test(control.value)
        ? null
        : { email: true };
    };
  }

  static minDate(date: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = control.value as Date;
      const isValid = currentDate && date > new Date(currentDate);
      console.log(currentDate, ' <--> ', date);
      console.log(typeof currentDate, ' <--> ', date);
      return  isValid ? null : { minDate: true };
    };
  }

  static custom(
    validatorFn: () => ValidatorFn,
    validationMessage: string
  ): ValidatorFn {
    return (control: AbstractControl) => {
      const isValid = !validatorFn()(control);
      return isValid ? null : { custom: { message: validationMessage } };
    };
  }

  static in(list: Array<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return list && list.indexOf(control.value) > -1 ? null : { in: true };
    };
  }
}

/*
TODO:
x. Create async validator: https://angular.io/guide/form-validation#implementing-custom-async-validator

*/
