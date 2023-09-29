export interface IAppService {
    id?: number;
    code?: string;
    libelle?: string;
    appUri?: boolean;
    description?: string;
}

export class AppService implements IAppService {

    constructor(
        public id?: number, 
        public code?: string,
        public libelle?: string,
        public appUri?: boolean,
        public description?: string
       ){}
}