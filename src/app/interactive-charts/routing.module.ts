import { Routes, RouterModule } from "@angular/router";
import { InteractiveChartsComponent } from "./interactive-charts.component";

const routes: Routes = [{
  path: '', component: InteractiveChartsComponent
}];
export default RouterModule.forChild(routes);
