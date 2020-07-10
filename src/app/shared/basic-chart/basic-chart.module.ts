import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BasicChartComponent } from "./basic-chart.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BasicChartComponent],
  exports: [BasicChartComponent]
})
export class BasicChartModule {}
