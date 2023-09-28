import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { IProfil, IProfilDTO } from '../model/profil';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IProfil>;
type EntityArrayResponseType = HttpResponse<IProfil[]>;

const resourceUrl = environment.profilUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(protected http: HttpClient) {}

  create(profil: IProfil): Observable<EntityResponseType> {
    return this.http.post<IProfil>(resourceUrl, profil, { observe: 'response' });
  }

  update(profil: IProfil): Observable<EntityResponseType> {
    return this.http.post<IProfil>(resourceUrl, profil, { observe: 'response' });
  }

  addPrivilege(profil: IProfilDTO): Observable<EntityResponseType> {
    return this.http.put<IProfil>(resourceUrl, profil, { observe: 'response' });
  }

  
  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IProfil[]>(resourceUrl, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfil>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  findByName(name?: string): Observable<EntityResponseType> {
    return this.http.get<IProfil>(`${resourceUrl}/${name}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfil[]>(resourceUrl, { params: options, observe: 'response' });
  }

  delete(name: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${name}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IProfil[]>(resourceUrl, { observe: 'response' });
  }
}
