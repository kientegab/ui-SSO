import { IRegion } from "./region.model";

export interface IProvince{
    id?: number;
    code?: string;
    libelle?: string;
    region?: IRegion;
    chefLieu?: string
}

export class Province implements IProvince{
    constructor(
       public id?: number,
       public code?: string,
       public libelle?: string,
       public region?: IRegion,
       public chefLieu?: string
    ){}
}


