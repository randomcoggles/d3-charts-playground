import { Injectable } from "@angular/core";

@Injectable()
export class ThreeDCarrousselManager {
  constructor() {}
  depth = 180;
  speed = "8s";
  perspective = '800px';
  perspectiveOrigin = "50% -225px";
}