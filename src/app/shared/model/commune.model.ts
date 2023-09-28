import { IProvince } from "./province.model";

export interface ICommune{
    id?: number;
    code?: string;
    libelle?: string;
    province?: IProvince;
}

export class Commune implements ICommune{
    constructor(
        public id?: number, 
        public code?: string,
        public libelle?: string,
        public province?: IProvince
    ){}
}