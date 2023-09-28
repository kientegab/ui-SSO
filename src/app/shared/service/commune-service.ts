import { Injectable } from '@angular/core';
import {  ICommune } from '../model/commune.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<ICommune>;
type EntityArrayResponseType = HttpResponse<ICommune[]>;

const communeUrl = environment.communeUrl;

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  constructor(private http:HttpClient) { }
  create(pays: ICommune): Observable<EntityResponseType> {
    return this.http.post<ICommune>(communeUrl, pays, { observe: 'response' });
  }

  update(pays: ICommune): Observable<EntityResponseType> {
    return this.http.put<ICommune>(communeUrl, pays, { observe: 'response' });
  }

  findCommuneByIdProvince(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICommune[]>(`${communeUrl}/liste/${id}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommune>(`${communeUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
   // return this.http.get<ICommune[]>("assets/data/communes.json", { params: options, observe: 'response' });
     return this.http.get<ICommune[]>(communeUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<ICommune[]>(communeUrl+'/liste', { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${communeUrl}/${id}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<ICommune[]>(communeUrl, { observe: 'response' });
  }
}