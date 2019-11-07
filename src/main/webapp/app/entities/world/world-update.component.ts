import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IWorld, World } from 'app/shared/model/world.model';
import { WorldService } from './world.service';

@Component({
  selector: 'jhi-world-update',
  templateUrl: './world-update.component.html'
})
export class WorldUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]]
  });

  constructor(protected worldService: WorldService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ world }) => {
      this.updateForm(world);
    });
  }

  updateForm(world: IWorld) {
    this.editForm.patchValue({
      id: world.id,
      name: world.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const world = this.createFromForm();
    if (world.id !== undefined) {
      this.subscribeToSaveResponse(this.worldService.update(world));
    } else {
      this.subscribeToSaveResponse(this.worldService.create(world));
    }
  }

  private createFromForm(): IWorld {
    return {
      ...new World(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorld>>) {
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
