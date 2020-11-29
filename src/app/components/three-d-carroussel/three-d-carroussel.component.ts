import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from "@angular/core";
import { ThreeDCarrousselManager } from "./three-d-carroussel.manager";


@Component({
  selector: "app-simple-three-d-carroussel",
  styleUrls: ["./three-d-carroussel.component.scss"],
  templateUrl: "./three-d-carroussel.component.html"
})
export class ThreeDCarrousselComponent
  implements OnChanges, AfterViewChecked, OnInit, OnDestroy {
  @ViewChild("container") container: ElementRef;
  @Input() data;
  @Input() depth = 180;
  @Input() speed = "8s";
  @Input() perspectiveOrigin = "50% -225px";
  showController = false;
  
  manualPerspectiveOrigin = '';
  private perspectiveOriginDefault = true;
  
  constructor(public tcManager: ThreeDCarrousselManager) {

  }

  ngOnInit() {
    const threeDCarrousselProps = JSON.parse(
      localStorage.getItem("app-3d-carroussel-defaults") || "{}"
    );
    if (threeDCarrousselProps.depth) {
      this.depth = threeDCarrousselProps.depth;
      this.speed = threeDCarrousselProps.speed || this.speed;
      this.perspectiveOrigin =
        threeDCarrousselProps.perspectiveOrigin || this.perspectiveOrigin;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    
    if (changes.perspectiveOrigin && changes.perspectiveOrigin.currentValue) {
      this.manualPerspectiveOrigin = this.manualPerspectiveOrigin;
    }
    
    if (changes.data && changes.data.currentValue) {
      const l = this.data.length;
      const dgStep = 360 / l;
      let dgIncrement = 0;
      this.data.forEach(item => {
        item.transform = `rotateY(${dgIncrement}deg)  translateZ(${
          this.depth
        }px)`;
        item.bkPtransform = `rotateY(${dgIncrement}deg)  translateZ(${this
          .depth - 1}px)`;
        dgIncrement += dgStep;
      });
    }
  }

  ngAfterViewChecked() {
    const w = parseInt(getComputedStyle(this.container.nativeElement).width);
    if (!Number.isNaN(w)) {
      this.depth = w / 4;
    }
  }

  get cperspectiveOrigin() {
    return this.perspectiveOriginDefault ? this.perspectiveOrigin : 123;
  }
  ngOnDestroy() {}
}
