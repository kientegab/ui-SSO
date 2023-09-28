export enum EnumStatusReponse {
  CODE_200 = 200,
  CODE_404 = 404,
  CODE_500 = 500,
}

// export enum CategorieEmployeurEnum {
// 	Physique=0,
// 	Morale=1
// }
// export enum CategorieEmployeurEnum {
// 	false="Personne physique",
// 	true="Personne morale"
// }






export const MESSAGE_PAR_STATUS_REPONSE = {
  200: 'Opération effectuée avec succès',
  404: 'Donnée introuvable',
  500: 'Erreur système, veuillez contacter un administrateur',
};

/** Liste des sexes */
export const LISTE_SEXES = [
  { code: 'MASCULIN', lib: 'MASCULIN' },
  { code: 'FEMININ', lib: 'FÉMININ' },
];


export const LISTE_STATUTS_USER = {
  0: 'INACTIF',
  1: 'ACTIF',
};

export enum EnumListeStatuts {
  INACTIF = 0,
  ACTIF = 1,
}

export const LISTE_FORMAT_FILE = [
  { format: 'PDF', libelle: 'PDF' },
  { format: 'EXCEL', libelle: 'EXCEL' },
];

export const LISTE_CATEGORIE = [
  { categorie: "ENTREPRISE_INDIVIDUELLE", lib: 'ENTREPRISE INDIVIDUELLE' },
  { categorie: "ADMINISTRATION", lib: 'ADMINISTRATION'},
  { categorie: "SOCIETE_COMMERCIALE", lib: 'SOCIETE COMMERCIALE'},
  { categorie: "ENTREPRISES_ASSOCIATIVES", lib: 'ENTREPRISES ASSOCIATIVES'},
  { categorie: "INDEPENDANTS", lib: 'INDEPENDANTS'},
  { categorie: "MENAGES", lib: 'MENAGES'},
  { categorie: "PENSIONNES", lib: 'PENSIONNES'}
];

export const SITUATION_MATRIMONIALES = [
  { libelle: "MARIE" }, { libelle: "DIVORCE" }, { libelle: "CELIBATAIRE" }, { libelle: "VEUF" }
];

export const LISTE_TYPE_DOCUMENTS = [
  { type: "ATTESTATION", libelle: 'ATTESTATION' },
  { type: "CARTE", libelle: 'CARTE'}
];

export const LISTE_TITRE_SIGNATAIRE = [
    { code: 'TITULAIRE',libelle:'TITULAIRE'},
    { code: 'PAR_INTERIM', libelle:'INTERIM'},
    { code: 'PAR_DELEGATION', libelle:'DELEGATION'},
    { code: 'PAR_ORDRE',libelle: 'ORDRE'}
];
/** Liste des status immatriculation */
export const STATUS_IMMATRICULATION = [
  { code: 'TOUT', lib: 'TOUT' },
  { code: 'VALIDE', lib: 'VALIDE' },
  { code: 'ATTENTE', lib: 'EN ATTENTE' },
  { code: 'REJETE', lib: 'REJETE' }
];
