import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IDominantHand } from 'app/shared/model/dominant-hand.model';
import { AccountService } from 'app/core/auth/account.service';
import { DominantHandService } from './dominant-hand.service';

@Component({
  selector: 'jhi-dominant-hand',
  templateUrl: './dominant-hand.component.html'
})
export class DominantHandComponent implements OnInit, OnDestroy {
  dominantHands: IDominantHand[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dominantHandService: DominantHandService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dominantHandService
      .query()
      .pipe(
        filter((res: HttpResponse<IDominantHand[]>) => res.ok),
        map((res: HttpResponse<IDominantHand[]>) => res.body)
      )
      .subscribe((res: IDominantHand[]) => {
        this.dominantHands = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDominantHands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDominantHand) {
    return item.id;
  }

  registerChangeInDominantHands() {
    this.eventSubscriber = this.eventManager.subscribe('dominantHandListModification', response => this.loadAll());
  }
}
