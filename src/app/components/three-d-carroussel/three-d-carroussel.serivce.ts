import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarrousselCard } from "./three-d-carroussel.models";

@Injectable()
export class ThreeDCarrousselService {

  constructor(private http: HttpClient) { }

  getCarrousselCards(): Observable<Array<CarrousselCard>> {
    return this.http.get<Array<CarrousselCard>>('/assets/data/mock-carroussel-cards.json');
    
  }  
}