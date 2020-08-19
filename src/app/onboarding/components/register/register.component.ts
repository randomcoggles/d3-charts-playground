import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppValidators } from "../../../shared/app-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);

    this.form = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(65)])],
      surname:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      company: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(65)])],
      country: ['', Validators.required],
      birthday: ['', AppValidators.minDate(minDate)],
      email: [''],
      cellphone: ['']
    });
  }

  preventSpecialChars(val, p?): boolean {
    return /[a-zA-Z\d\s]/.test(val && val.key);
  }

  submit() {
    
  }

  get f() {
    return this.form.controls;
  }


}