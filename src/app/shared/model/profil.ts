import { IPrivilege } from "./privilege";

export interface IProfil {
    id?: number;
    code?: string;
    libelle?: string;
    nativeProfile?: boolean;
    privilegeCollection?: IPrivilege[];
}

export class Profil implements IProfil {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public nativeProfile?: boolean,
        public privilegeCollection?: IPrivilege[]
    ){}
}


export interface IProfilDTO {
    id?: number;
    libelle?: string;
    nativeProfile?: boolean;
    privileges?: IPrivilege[];
}

export class ProfilDTO implements IProfilDTO {
    constructor(
        public id?: number,
        public libelle?: string,
        public nativeProfile?: boolean,
        public privileges?: IPrivilege[]
    ){}
}