import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SampleAppTestModule } from '../../../test.module';
import { DominantHandDetailComponent } from 'app/entities/dominant-hand/dominant-hand-detail.component';
import { DominantHand } from 'app/shared/model/dominant-hand.model';

describe('Component Tests', () => {
  describe('DominantHand Management Detail Component', () => {
    let comp: DominantHandDetailComponent;
    let fixture: ComponentFixture<DominantHandDetailComponent>;
    const route = ({ data: of({ dominantHand: new DominantHand(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleAppTestModule],
        declarations: [DominantHandDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DominantHandDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DominantHandDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dominantHand).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
