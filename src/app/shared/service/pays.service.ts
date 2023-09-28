import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { IPays, Pays } from '../model/pays.model';

type EntityResponseType = HttpResponse<IPays>;
type EntityArrayResponseType = HttpResponse<IPays[]>;

const paysUrl = environment.paysUrl;

@Injectable({
  providedIn: 'root'
})
export class PaysService {

    constructor(private http:HttpClient) { }

    create(pays: IPays): Observable<EntityResponseType> {
      return this.http.post<IPays>(paysUrl, pays, { observe: 'response' });
    }
  
    update(pays: IPays): Observable<EntityResponseType> {
      return this.http.put<IPays>(paysUrl, pays, { observe: 'response' });
    }
  
    find(id: number): Observable<EntityResponseType> {
      return this.http.get<IPays>(`${paysUrl}/${id}`, { observe: 'response' });
    }
  
    query(req?: any): Observable<EntityArrayResponseType> {
      const options = createRequestOption(req);
      return this.http.get<IPays[]>(paysUrl, { params: options, observe: 'response' });
    }
  
    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
      //return this.http.get<IPays[]>("assets/data/pays.json", { observe: 'response' });
      return this.http.get<IPays[]>(paysUrl, { observe: 'response' });
    }
  
    delete(id: number): Observable<HttpResponse<{}>> {
      return this.http.delete(`${paysUrl}/${id}`, { observe: 'response' });
    }
  
    findListe(): Observable<EntityArrayResponseType> {
      return this.http.get<IPays[]>(paysUrl, { observe: 'response' });
    }
}
