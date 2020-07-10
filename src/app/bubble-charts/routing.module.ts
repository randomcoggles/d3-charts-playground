
import { RouterModule } from "@angular/router";
import { BubbleChartsComponent } from "./bubble-charts.component";

const routes = [{ path: '', component: BubbleChartsComponent}]
export const BubbleChartsRoutingModule = RouterModule.forChild(routes);