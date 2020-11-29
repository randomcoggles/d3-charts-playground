import { Injectable } from "@angular/core";

type CarousselDefaults = {
  depth: number;
  speed: string;
  perspective: string;
  perspectiveOrigin: string;

}

@Injectable()
export class ThreeDCarrousselManager {
  depth = 180;
  speed = "8s";
  perspective = '800px';
  perspectiveOrigin = "50% -225px";

  constructor() {
    const defaultsStr = localStorage.getItem('app-3d-carroussel-defaults');
    if(defaultsStr) {
      const defaultsObj = JSON.parse(defaultsStr) as CarousselDefaults;
      this.depth = defaultsObj.depth
      this.speed = defaultsObj.speed;
      this.perspective = defaultsObj.perspective;
      this.perspectiveOrigin = defaultsObj.perspectiveOrigin;
    }
  }



  saveDefaults() {
    localStorage.setItem('app-3d-carroussel-defaults', JSON.stringify(this));
  }
}
