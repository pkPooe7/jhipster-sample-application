import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SampleAppTestModule } from '../../../test.module';
import { DominantHandUpdateComponent } from 'app/entities/dominant-hand/dominant-hand-update.component';
import { DominantHandService } from 'app/entities/dominant-hand/dominant-hand.service';
import { DominantHand } from 'app/shared/model/dominant-hand.model';

describe('Component Tests', () => {
  describe('DominantHand Management Update Component', () => {
    let comp: DominantHandUpdateComponent;
    let fixture: ComponentFixture<DominantHandUpdateComponent>;
    let service: DominantHandService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleAppTestModule],
        declarations: [DominantHandUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DominantHandUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DominantHandUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DominantHandService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DominantHand(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DominantHand();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
