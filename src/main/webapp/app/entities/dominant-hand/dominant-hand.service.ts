import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDominantHand } from 'app/shared/model/dominant-hand.model';

type EntityResponseType = HttpResponse<IDominantHand>;
type EntityArrayResponseType = HttpResponse<IDominantHand[]>;

@Injectable({ providedIn: 'root' })
export class DominantHandService {
  public resourceUrl = SERVER_API_URL + 'api/dominant-hands';

  constructor(protected http: HttpClient) {}

  create(dominantHand: IDominantHand): Observable<EntityResponseType> {
    return this.http.post<IDominantHand>(this.resourceUrl, dominantHand, { observe: 'response' });
  }

  update(dominantHand: IDominantHand): Observable<EntityResponseType> {
    return this.http.put<IDominantHand>(this.resourceUrl, dominantHand, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDominantHand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDominantHand[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
