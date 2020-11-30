import { Routes, RouterModule } from "@angular/router";
import { FormDesignComponent } from "./form-design.component";

const routes: Routes = [
  {
    path: '',
    component: FormDesignComponent
  }
];
const FormDesignRoutingModule = RouterModule.forChild(routes);
export default  FormDesignRoutingModule