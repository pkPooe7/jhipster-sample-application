import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDominantHand, DominantHand } from 'app/shared/model/dominant-hand.model';
import { DominantHandService } from './dominant-hand.service';
import { IClassification } from 'app/shared/model/classification.model';
import { ClassificationService } from 'app/entities/classification/classification.service';

@Component({
  selector: 'jhi-dominant-hand-update',
  templateUrl: './dominant-hand-update.component.html'
})
export class DominantHandUpdateComponent implements OnInit {
  isSaving: boolean;

  classifications: IClassification[];

  editForm = this.fb.group({
    id: [],
    hand: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dominantHandService: DominantHandService,
    protected classificationService: ClassificationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dominantHand }) => {
      this.updateForm(dominantHand);
    });
    this.classificationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClassification[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClassification[]>) => response.body)
      )
      .subscribe((res: IClassification[]) => (this.classifications = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(dominantHand: IDominantHand) {
    this.editForm.patchValue({
      id: dominantHand.id,
      hand: dominantHand.hand
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dominantHand = this.createFromForm();
    if (dominantHand.id !== undefined) {
      this.subscribeToSaveResponse(this.dominantHandService.update(dominantHand));
    } else {
      this.subscribeToSaveResponse(this.dominantHandService.create(dominantHand));
    }
  }

  private createFromForm(): IDominantHand {
    return {
      ...new DominantHand(),
      id: this.editForm.get(['id']).value,
      hand: this.editForm.get(['hand']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDominantHand>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClassificationById(index: number, item: IClassification) {
    return item.id;
  }
}
