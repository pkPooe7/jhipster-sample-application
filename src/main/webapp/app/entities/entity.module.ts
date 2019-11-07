import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'alien',
        loadChildren: () => import('./alien/alien.module').then(m => m.SampleAppAlienModule)
      },
      {
        path: 'world',
        loadChildren: () => import('./world/world.module').then(m => m.SampleAppWorldModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SampleAppEntityModule {}
