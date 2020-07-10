import { Routes, RouterModule } from "@angular/router";
import { SimpleAxesComponent } from "./components/axes/axes.component";
import { SimpleChartsComponent } from "./simple-charts.component";
import { D3AngularSimpleAxesComponent } from "./components/d3-angular-simple-axes/d3-angular-simple-axes.component";

const routes: Routes = [
  {
    path: "",
    component: SimpleChartsComponent,
    children: [
      { path: "d3-simple-axes", component: SimpleAxesComponent },
      { path: "", redirectTo: "d3-simple-axes", pathMatch: "full" },
      { path: "d3-angular-simple-axes", component: D3AngularSimpleAxesComponent },
    ]
  }
];

const SimpleChartsRoutingModule = RouterModule.forChild(routes);
export default SimpleChartsRoutingModule;
