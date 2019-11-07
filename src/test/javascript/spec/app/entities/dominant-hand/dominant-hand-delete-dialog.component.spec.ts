import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SampleAppTestModule } from '../../../test.module';
import { DominantHandDeleteDialogComponent } from 'app/entities/dominant-hand/dominant-hand-delete-dialog.component';
import { DominantHandService } from 'app/entities/dominant-hand/dominant-hand.service';

describe('Component Tests', () => {
  describe('DominantHand Management Delete Component', () => {
    let comp: DominantHandDeleteDialogComponent;
    let fixture: ComponentFixture<DominantHandDeleteDialogComponent>;
    let service: DominantHandService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleAppTestModule],
        declarations: [DominantHandDeleteDialogComponent]
      })
        .overrideTemplate(DominantHandDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DominantHandDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DominantHandService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
