import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleAppTestModule } from '../../../test.module';
import { DominantHandComponent } from 'app/entities/dominant-hand/dominant-hand.component';
import { DominantHandService } from 'app/entities/dominant-hand/dominant-hand.service';
import { DominantHand } from 'app/shared/model/dominant-hand.model';

describe('Component Tests', () => {
  describe('DominantHand Management Component', () => {
    let comp: DominantHandComponent;
    let fixture: ComponentFixture<DominantHandComponent>;
    let service: DominantHandService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleAppTestModule],
        declarations: [DominantHandComponent],
        providers: []
      })
        .overrideTemplate(DominantHandComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DominantHandComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DominantHandService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DominantHand(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dominantHands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
