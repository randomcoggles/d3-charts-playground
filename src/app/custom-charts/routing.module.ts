import { Routes, RouterModule } from "@angular/router";
import { CustomChartsComponent } from "./custom-charts.component";

const routes: Routes = [{
  path: '', component: CustomChartsComponent
}];
export default RouterModule.forChild(routes);