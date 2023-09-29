import { Injectable } from '@angular/core';
import {  IAppService } from '../model/app-service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IAppService>;
type EntityArrayResponseType = HttpResponse<IAppService[]>;

const communeUrl = environment.appServiceUrl;

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(private http:HttpClient) { }
  create(appservice: IAppService): Observable<EntityResponseType> {
    return this.http.post<IAppService>(communeUrl, appservice, { observe: 'response' });
  }

  update(appservice: IAppService): Observable<EntityResponseType> {
    return this.http.put<IAppService>(communeUrl, appservice, { observe: 'response' });
  }

  findAppserviceByIdProvince(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IAppService[]>(`${communeUrl}/liste/${id}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppService>(`${communeUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IAppService[]>(communeUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IAppService[]>(communeUrl+'/liste', { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${communeUrl}/${id}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IAppService[]>(communeUrl, { observe: 'response' });
  }
}