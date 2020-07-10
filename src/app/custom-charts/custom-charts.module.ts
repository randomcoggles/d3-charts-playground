import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomChartsComponent } from "./custom-charts.component";
import routes from './routing.module';
import { LineChartComponent } from "./components/line-chart/line-chart.component";

@NgModule({
  imports: [CommonModule, routes ],
  declarations: [CustomChartsComponent, LineChartComponent]
})
export class CustomChartsModule {}