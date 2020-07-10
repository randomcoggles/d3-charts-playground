import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-new-sprint",
  templateUrl: "./new-sprint.component.html",
  styleUrls: ["./new-sprint.component.scss"]
})
export class NewSprintComponent implements OnInit{
  form: FormGroup;
  submitted = false;
  // #fcpm - Messages for comunicating with the user
  submitMessages: {  // FIXME: We may need to create an interface for this.
    success?: string;
    error?: string;
    waiting?: string;
  };
  
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  onSubmit(){

  }

  get f() { return this.form.controls; }

  isInvalid(control: AbstractControl, errorName?: string) {
    const isInvalid = (control.dirty && control.touched || this.submitted) && control.errors;
    return errorName ? isInvalid && control.errors[errorName] : isInvalid;
  }

  ngOnInit() {
    this.submitMessages = {  // FIXME: We may need to create an interface for this.
    success: '',
    error: '',
    waiting: ''
  }
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      team: []
    });

  }
}
