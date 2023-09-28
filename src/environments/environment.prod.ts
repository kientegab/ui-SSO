// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//const commonAppURI: string = 'http://192.168.1.122:64642/api/affiliation-immatriculation/';
//const commonAppURI: string = 'http://192.168.1.132:8090/api/affiliation-immatriculation/';
const commonAppURI: string = 'http://10.170.24.118:8089/api/affiliation-immatriculation/';

//const commonAppURI: string = 'http://192.168.1.150:8089/api/affiliation-immatriculation/';
const commonAppCOT: string = 'http://10.170.24.118:8089/api/cotisation/';
const commonAppCOT1: string = 'http://10.170.24.118:8090/api/affiliation-immatriculation/';

const commonAuth: string = 'http://10.170.24.118:8089/api/auth/';
export const environment = {
  production: true,
  recordsPerPage: 20,

  exemple: commonAppURI +'pays',
  communeUrl: commonAppURI +'communes', 
  provinceUrl: commonAppURI +'provinces',
  typesPieceUrl: commonAppURI +'type-pieces',
  typesAssureUrl: commonAppURI +'type-assures',
  resourceUrl: commonAppURI +'taux-forfait-cotisations',
  tauxCotisationUrl: commonAppURI +'taux-forfait-cotisations',
  divisionUrl: commonAppURI +'divisions',
  sectionUrl : commonAppURI +'sections',
  secteurActiviteUrl: commonAppURI +'secteur-activites',
  secteurVillageUrl: commonAppURI +'secteur-villages',
  userUrl: commonAuth +'utilisateurs',
  profilUrl: commonAuth +'profiles',
  privilegeUrl: commonAuth +'privileges',
  authResource: commonAuth +'utilisateurs/signin',
  accountResource: commonAuth +'utilisateurs/validate',
   // typeEmployeurUrl: commonAppURI +'typeEmployeur',

  typesCotisationUrl:commonAppCOT+'type-cotisations',
  arrondissementUrl: commonAppURI +'arrondissements',

  //tauxCotisationUrl: commonAppURI +'taux-cotisations',
  // regionUrl: commonAppURI +'regions ',
  // province: commonAppURI +'province ',
  // situationMatrimonial: commonAppURI +'situation-matrimoniale ',
  // affiliation: commonAppURI +'employeurs',
  categorieEmployeurUrl: commonAppURI +'categorieemployeurs',
  // banqueUrl: commonAppURI +'banque ',
  // caisseUrl: commonAppURI +'caisse ',
  // paysUrl: commonAppURI +'pays ',
  // roleUrl: commonAppURI +'role ',
  // typesCotisationUrl:commonAppURI+'types-cotisations',


  formesJuridique: commonAppURI +'formes-juridiques ',
  // situationMatrimonialeUrl: commonAppURI +'situation-matrimoniales ',
  //secteurVillage: commonAppURI +'secteur-villages ',

  regionUrl: commonAppURI +'regions',
  province: commonAppURI +'province',
  banqueUrl: commonAppURI +'banques',
  caisseUrl: commonAppCOT +'caisses',
  paysUrl: commonAppURI +'pays',
  roleUrl: commonAppURI +'role',


  formesJuridiqueUrl: commonAppURI +'forme-juridiques',
  fournisseurURL: commonAppURI + "fournisseurs",

  situationMatrimonial: commonAppURI +'situation-matrimoniale',
  affiliation: commonAppURI +'employeurs',
  affiliationValider: commonAppURI +'valider',
  tAssureTCotisationUrl: commonAppURI+ 'tassure-tcotisation',

  tAssureTCotisation:commonAppURI+ 'tassure-tcotisation',
  situationMatrimonialeUrl: commonAppURI +'situation-matrimoniales',
  classeUrl: commonAppURI +'classe',
  activiteUrl: commonAppURI +'activites',

  groupeURL: commonAppURI +'groupes',

  entreeSortieUrl: commonAppURI +'entree-sorties',


  typeEmployeurUrl: commonAppURI +'type-employeurs',
  emploiUrl: commonAppURI+'emplois',
  professionUrl: commonAppURI+'professions ',


  //pays: commonAppURI +'pays ',
  region: commonAppURI +'regions',
  //resourceUrl: commonAppURI +'taux-forfait-cotisations',
  //sectionUrl: commonAppURI +'sections',
  cotisationUrl: commonAppCOT +'cotisations',
  assureUrl: commonAppURI +'assures',
  dashbordUrl : commonAppURI+'reports',
 
 // tauxCotisationUrl: '',
//entreeSortieUrl: commonAppURI +'entreeSorties',
  declaration: commonAppURI+ 'declarations',
  employeur: commonAppURI+ 'employeurs',
  tauxByTypeEmployeurUrl: commonAppURI+ 'taux-type-employeur',
  tauxByTypeAssureUrl: commonAppURI+ 'taux-type-assure',
  resourceUploadFile: commonAppURI+ 'file/upload',
  resourceRetrieveFile: commonAppURI+ 'file/recuperer',
  resourceListeAssureByDeclaration: commonAppURI + 'declarations-Assure'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
