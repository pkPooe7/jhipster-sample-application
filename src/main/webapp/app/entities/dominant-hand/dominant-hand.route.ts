import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DominantHand } from 'app/shared/model/dominant-hand.model';
import { DominantHandService } from './dominant-hand.service';
import { DominantHandComponent } from './dominant-hand.component';
import { DominantHandDetailComponent } from './dominant-hand-detail.component';
import { DominantHandUpdateComponent } from './dominant-hand-update.component';
import { DominantHandDeletePopupComponent } from './dominant-hand-delete-dialog.component';
import { IDominantHand } from 'app/shared/model/dominant-hand.model';

@Injectable({ providedIn: 'root' })
export class DominantHandResolve implements Resolve<IDominantHand> {
  constructor(private service: DominantHandService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDominantHand> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DominantHand>) => response.ok),
        map((dominantHand: HttpResponse<DominantHand>) => dominantHand.body)
      );
    }
    return of(new DominantHand());
  }
}

export const dominantHandRoute: Routes = [
  {
    path: '',
    component: DominantHandComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sampleApp.dominantHand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DominantHandDetailComponent,
    resolve: {
      dominantHand: DominantHandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sampleApp.dominantHand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DominantHandUpdateComponent,
    resolve: {
      dominantHand: DominantHandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sampleApp.dominantHand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DominantHandUpdateComponent,
    resolve: {
      dominantHand: DominantHandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sampleApp.dominantHand.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dominantHandPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DominantHandDeletePopupComponent,
    resolve: {
      dominantHand: DominantHandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sampleApp.dominantHand.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
