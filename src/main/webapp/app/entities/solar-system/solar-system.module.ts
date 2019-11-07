import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleAppSharedModule } from 'app/shared/shared.module';
import { SolarSystemComponent } from './solar-system.component';
import { SolarSystemDetailComponent } from './solar-system-detail.component';
import { SolarSystemUpdateComponent } from './solar-system-update.component';
import { SolarSystemDeletePopupComponent, SolarSystemDeleteDialogComponent } from './solar-system-delete-dialog.component';
import { solarSystemRoute, solarSystemPopupRoute } from './solar-system.route';

const ENTITY_STATES = [...solarSystemRoute, ...solarSystemPopupRoute];

@NgModule({
  imports: [SampleAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SolarSystemComponent,
    SolarSystemDetailComponent,
    SolarSystemUpdateComponent,
    SolarSystemDeleteDialogComponent,
    SolarSystemDeletePopupComponent
  ],
  entryComponents: [SolarSystemDeleteDialogComponent]
})
export class SampleAppSolarSystemModule {}
