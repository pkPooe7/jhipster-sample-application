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
      },
      {
        path: 'solar-system',
        loadChildren: () => import('./solar-system/solar-system.module').then(m => m.SampleAppSolarSystemModule)
      },
      {
        path: 'classification',
        loadChildren: () => import('./classification/classification.module').then(m => m.SampleAppClassificationModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('./technology/technology.module').then(m => m.SampleAppTechnologyModule)
      },
      {
        path: 'dominant-hand',
        loadChildren: () => import('./dominant-hand/dominant-hand.module').then(m => m.SampleAppDominantHandModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SampleAppEntityModule {}
