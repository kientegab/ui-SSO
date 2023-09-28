import { IPays } from "./pays.model";
 
export interface IRegion{
    id?: number;
    code?: string;
    sigle?: string;
    libelle?: string;
    pays?: IPays;
}

export class Region implements IRegion{
    constructor(
        public id?: number,
        public code?: string,
        public sigle?: string,
        public libelle?: string,
        public pays?: IPays
    ){}
}
