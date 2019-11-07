import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDominantHand } from 'app/shared/model/dominant-hand.model';

@Component({
  selector: 'jhi-dominant-hand-detail',
  templateUrl: './dominant-hand-detail.component.html'
})
export class DominantHandDetailComponent implements OnInit {
  dominantHand: IDominantHand;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dominantHand }) => {
      this.dominantHand = dominantHand;
    });
  }

  previousState() {
    window.history.back();
  }
}
