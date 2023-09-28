import { Injectable } from '@angular/core';
import { IRegion } from '../model/region.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IRegion>;
type EntityArrayResponseType = HttpResponse<IRegion[]>;

const regionUrl = environment.regionUrl;

@Injectable({
  providedIn: 'root'
})
export class RegionService {

    constructor(private http:HttpClient) { }
 
    create(region: IRegion): Observable<EntityResponseType> {
      return this.http.post<IRegion>(regionUrl, region, { observe: 'response' });
    }
  
    update(region: IRegion): Observable<EntityResponseType> {
      return this.http.put<IRegion>(regionUrl, region, { observe: 'response' });
    }
  
    find(id: number): Observable<EntityResponseType> {
      return this.http.get<IRegion>(`${regionUrl}/${id}`, { observe: 'response' });
    }
  
    query(req?: any): Observable<EntityArrayResponseType> {
      const options = createRequestOption(req);
      return this.http.get<IRegion[]>(regionUrl, { params: options, observe: 'response' });
    }
  
    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
     // return this.http.get<IRegion[]>("assets/data/region.json", { observe: 'response' });
      return this.http.get<IRegion[]>(regionUrl, { observe: 'response' });
    }
  
    delete(id: number): Observable<HttpResponse<{}>> {
      return this.http.delete(`${regionUrl}/${id}`, { observe: 'response' });
    }
  
    findListe(): Observable<EntityArrayResponseType> {
      return this.http.get<IRegion[]>(regionUrl, { observe: 'response' });
    }
}
