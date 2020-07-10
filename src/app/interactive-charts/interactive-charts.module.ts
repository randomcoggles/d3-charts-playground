import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InteractiveChartsComponent } from "./interactive-charts.component";
import routingModule from "./routing.module";
import { BrushSelectionComponent } from "./components/brush-selection/brush-selection.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MaterialComponentsModule } from "../shared/material-components/material-components.module";

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, MaterialComponentsModule, routingModule],
  declarations: [InteractiveChartsComponent, BrushSelectionComponent]
})
export class InteractiveChartsModule {}