import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlien, Alien } from 'app/shared/model/alien.model';
import { AlienService } from './alien.service';

@Component({
  selector: 'jhi-alien-update',
  templateUrl: './alien-update.component.html'
})
export class AlienUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(50)]],
    homePlanet: []
  });

  constructor(protected alienService: AlienService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alien }) => {
      this.updateForm(alien);
    });
  }

  updateForm(alien: IAlien) {
    this.editForm.patchValue({
      id: alien.id,
      name: alien.name,
      homePlanet: alien.homePlanet
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const alien = this.createFromForm();
    if (alien.id !== undefined) {
      this.subscribeToSaveResponse(this.alienService.update(alien));
    } else {
      this.subscribeToSaveResponse(this.alienService.create(alien));
    }
  }

  private createFromForm(): IAlien {
    return {
      ...new Alien(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      homePlanet: this.editForm.get(['homePlanet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlien>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
