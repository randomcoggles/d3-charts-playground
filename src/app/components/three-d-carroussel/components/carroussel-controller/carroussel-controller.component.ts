import { Component, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ThreeDCarrousselManager } from "../../three-d-carroussel.service";

@Component({
  selector: 'app-carroussel-ccontroller',
  templateUrl: './carroussel-controller.component.html',
  styleUrls: ['./carroussel-controller.component.scss']
})
export class CarrousselControllerComponent implements AfterViewInit {

  @ViewChild('perspectiveArea') perspectiveArea: ElementRef;
  @Input() depth = 180;
  @Input() speed = "8s";
  @Input() public perspectiveOrigin = "";
  event: any;
  ballPoint: {x: number, y: number} = {x: 100, y: 100};
  val1 = {};

  constructor(public tcManager: ThreeDCarrousselManager) {  }

  ngAfterViewInit() {

  }

  positionPointer(event){
      this.ballPoint = {x: event.offsetX -5, y: event.offsetY -5 }
  }

  perspectiveAreaMousemove(event) {
    const point = {x: event.offsetX, y: event.offsetY };
    this.event = event;
    if(event.which === 1) {
      const fatorY = Math.round(200/100);
      const fatorX = Math.round(200/150);      
      const x = point.x - 5;
      const y = point.y - 5;// 200/(y | 1) + '%'
      if(x <= 0 || y <= 0){
        return;
      }
      this.ballPoint = {x, y}
      this.val1 = {x, y};
      this.tcManager.perspectiveOrigin = 
      Math.round(x/200 * 100) + '%' + ' ' + 
      Math.round( (y -100) * 2.5) + '%';
        console.log(point, 'this.tcManager.perspectiveOrigin:\t', this.tcManager.perspectiveOrigin);
    }
  }

  perspectiveAreaMouseWheel(event) {
    if(event.type === 'wheel') {
      let currentVal = parseInt(this.tcManager.perspective, 10);
      if(event.deltaY > 0) {
        currentVal += 60;
      } else {
        currentVal -= 60;
      }
      this.tcManager.perspective = currentVal + 'px';
      console.log('event:\t', this.tcManager.perspective);
    }
    event.preventDefault();
    return false;
  }

  get ballPointTransform() {
    return `scale(${800 / parseInt(this.tcManager.perspective) })`;
  }

}