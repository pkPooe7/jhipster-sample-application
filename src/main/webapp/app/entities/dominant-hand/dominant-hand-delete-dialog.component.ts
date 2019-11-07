import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDominantHand } from 'app/shared/model/dominant-hand.model';
import { DominantHandService } from './dominant-hand.service';

@Component({
  selector: 'jhi-dominant-hand-delete-dialog',
  templateUrl: './dominant-hand-delete-dialog.component.html'
})
export class DominantHandDeleteDialogComponent {
  dominantHand: IDominantHand;

  constructor(
    protected dominantHandService: DominantHandService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dominantHandService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dominantHandListModification',
        content: 'Deleted an dominantHand'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dominant-hand-delete-popup',
  template: ''
})
export class DominantHandDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dominantHand }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DominantHandDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dominantHand = dominantHand;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dominant-hand', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dominant-hand', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
