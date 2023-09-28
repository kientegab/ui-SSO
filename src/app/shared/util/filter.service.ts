import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterParameterService {

  constructor() { }

    transform(items: any[], searchText?: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        console.warn("search",searchText)
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            return it.libelle.toLocaleLowerCase().includes(searchText);
        });
    }
    transformWithNom(items: any[], searchText?: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        console.warn("search",searchText)
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            return it.signataire.nom.toLocaleLowerCase().includes(searchText);
        });
    }
}
