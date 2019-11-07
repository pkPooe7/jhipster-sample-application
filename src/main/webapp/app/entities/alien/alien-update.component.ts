import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAlien, Alien } from 'app/shared/model/alien.model';
import { AlienService } from './alien.service';
import { IWorld } from 'app/shared/model/world.model';
import { WorldService } from 'app/entities/world/world.service';

@Component({
  selector: 'jhi-alien-update',
  templateUrl: './alien-update.component.html'
})
export class AlienUpdateComponent implements OnInit {
  isSaving: boolean;

  worlds: IWorld[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    homeWorld: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected alienService: AlienService,
    protected worldService: WorldService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alien }) => {
      this.updateForm(alien);
    });
    this.worldService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWorld[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWorld[]>) => response.body)
      )
      .subscribe((res: IWorld[]) => (this.worlds = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(alien: IAlien) {
    this.editForm.patchValue({
      id: alien.id,
      name: alien.name,
      homeWorld: alien.homeWorld
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
      homeWorld: this.editForm.get(['homeWorld']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackWorldById(index: number, item: IWorld) {
    return item.id;
  }
}
