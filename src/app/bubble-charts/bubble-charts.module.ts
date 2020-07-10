import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartsRoutingModule } from './routing.module';
import { BubbleChartsComponent } from './bubble-charts.component';

@NgModule({
  imports: [
    CommonModule,
    BubbleChartsRoutingModule
  ],
  declarations: [BubbleChartsComponent]
})
export class BubbleChartsModule { }