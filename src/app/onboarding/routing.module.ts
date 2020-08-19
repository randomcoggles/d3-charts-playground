import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent }  from "./components/register/register.component";
// import { RegisterComponent } from "../components/register.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'register', pathMatch: 'full'}
]
const OnboadingRoutingModule = RouterModule.forChild(routes)
export default OnboadingRoutingModule;