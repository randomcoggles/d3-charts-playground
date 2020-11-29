import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThreeDCarrousselComponent } from "./three-d-carroussel.component";
import { CarrousselControllerComponent } from "./components/carroussel-controller/carroussel-controller.component";
import { MaterialComponentsModule } from "../../shared/material-components/material-components.module";
import { ThreeDCarrousselManager } from "./three-d-carroussel.manager";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  declarations: [ThreeDCarrousselComponent, CarrousselControllerComponent],
  exports: [ThreeDCarrousselComponent],
  providers: [ThreeDCarrousselManager]
})
export class ThreeDCarrousselModule {}
