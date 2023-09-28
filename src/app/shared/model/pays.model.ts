export interface IPays{
    id?: number;
    code?: string;
    libelle?: string;
    nationalite?: string;
}
export class Pays implements IPays {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public nationalite?: string){}
}



