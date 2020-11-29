import { Component, OnInit } from '@angular/core';
import { CarrousselCard } from '../three-d-carroussel/three-d-carroussel.models';
import { ThreeDCarrousselService } from '../three-d-carroussel/three-d-carroussel.serivce';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carrousselData: Array<CarrousselCard> = [];

  constructor(private threeCarroussellService: ThreeDCarrousselService) { }

  ngOnInit() {
    this.threeCarroussellService.getCarrousselCards()
    .subscribe({
      next: (cards: Array<CarrousselCard> ) => {
        debugger;
        this.carrousselData = cards;
      }
    })
  }

}