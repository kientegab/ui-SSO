// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//10.170.24.118   ********
//const commonAppURI: string = 'http://192.168.1.122:64642/api/affiliation-immatriculation/';
//const commonAppURI: string = 'http://192.168.1.216:8089/api/affiliation-immatriculation/';
const commonAppURI: string = 'http://localhost:8089/api/affiliation-immatriculation/';

//const commonAppURI: string = 'http://192.168.1.150:8089/api/affiliation-immatriculation/';
//const commonAppCOT: string = 'http://localhost:8090/api/';
const commonAppCOT: string = 'http://localhost:8089/api/cotisations/';
//const commonAppCOT: string = 'http://192.168.1.216:8089/api/cotisations/';
//const commonAppCOT1: string = 'http://10.170.24.118:8090/api/affiliation-immatriculation/';

const commonAuth: string = 'http://localhost:8099/api/auth/';

export const environment = {
  production: false,
  recordsPerPage: 20,
  provinceUrl: "",
  dashbordUrl:"",
  communeUrl: commonAppURI +'communes',
  userUrl: commonAuth +'utilisateurs',
  appServiceUrl: commonAuth +'services',
  profilUrl: commonAuth +'profiles',
  privilegeUrl: commonAuth +'privileges',
  authResource: commonAuth +'utilisateurs/signin',
  accountResource: commonAuth +'utilisateurs/validate',
};
/****** */
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
