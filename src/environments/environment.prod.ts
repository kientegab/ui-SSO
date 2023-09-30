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

  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
