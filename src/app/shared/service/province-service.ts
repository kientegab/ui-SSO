import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProvince } from '../model/province.model';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IProvince>;
type EntityArrayResponseType = HttpResponse<IProvince[]>;

const provinceUrl = environment.provinceUrl;

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http:HttpClient) { }

  create(province: IProvince): Observable<EntityResponseType> {
    return this.http.post<IProvince>(provinceUrl, province, { observe: 'response' });
  }

  update(profession: IProvince): Observable<EntityResponseType> {
    return this.http.put<IProvince>(provinceUrl, profession, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProvince>(`${provinceUrl}/${id}`, { observe: 'response' });
  }

  findProvinceByIdRegion(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IProvince[]>(`${provinceUrl}/region/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
   // return this.http.get<IProvince[]>("assets/data/provinces.json", { observe: 'response' });
     return this.http.get<IProvince[]>(provinceUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IProvince[]>(provinceUrl+'/liste', { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${provinceUrl}/${id}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IProvince[]>(provinceUrl, { observe: 'response' });
  }
}
