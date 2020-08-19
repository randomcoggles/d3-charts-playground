import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../shared/material-components/material-components.module";
import { RegisterComponent }  from "./components/register/register.component";
import OnboadingRoutingModule from "./routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule(
  {
    imports: [
      CommonModule,
      MaterialComponentsModule,
      FormsModule,
      ReactiveFormsModule,
      OnboadingRoutingModule
    ],
    declarations: [RegisterComponent]
  })
  export class OnboardingModule {}