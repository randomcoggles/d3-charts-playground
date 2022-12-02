import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAxesComponent } from './components/axes/axes.component';
import SimpleChartsRoutingModule from './routing.module';
import { SimpleChartsComponent } from './simple-charts.component';
import { MaterialComponentsModule } from '../shared/material-components/material-components.module';
import { D3AngularSimpleAxesComponent } from './components/d3-angular-simple-axes/d3-angular-simple-axes.component';
import { HttpClientModule } from '@angular/common/http';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { SimpleLineChart } from './components/line-chart/line-chart.component';
import { BarchartComponent } from './components/bar-chart/bar-chart.component';
import { BasicChartModule } from '../shared/basic-chart/basic-chart.module';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SimpleNetworkComponent } from './components/simple-network/simple-network.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    SimpleChartsRoutingModule,
    HttpClientModule,
    BasicChartModule
  ],
  declarations: [
    SimpleChartsComponent,
    D3AngularSimpleAxesComponent,
    SimpleAxesComponent,
    BubbleChartComponent,
    SimpleLineChart,
    BarchartComponent,
    TimelineComponent,
    SimpleNetworkComponent
    ]
})
export class SimpleChartsModule { }