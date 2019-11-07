import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleAppSharedModule } from 'app/shared/shared.module';
import { DominantHandComponent } from './dominant-hand.component';
import { DominantHandDetailComponent } from './dominant-hand-detail.component';
import { DominantHandUpdateComponent } from './dominant-hand-update.component';
import { DominantHandDeletePopupComponent, DominantHandDeleteDialogComponent } from './dominant-hand-delete-dialog.component';
import { dominantHandRoute, dominantHandPopupRoute } from './dominant-hand.route';

const ENTITY_STATES = [...dominantHandRoute, ...dominantHandPopupRoute];

@NgModule({
  imports: [SampleAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DominantHandComponent,
    DominantHandDetailComponent,
    DominantHandUpdateComponent,
    DominantHandDeleteDialogComponent,
    DominantHandDeletePopupComponent
  ],
  entryComponents: [DominantHandDeleteDialogComponent]
})
export class SampleAppDominantHandModule {}
