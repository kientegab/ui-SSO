export interface ILoginVM {
    username?:string;
    password?:string;
    appName?: string;
    rememberMe?:boolean;
}

export class LoginVM implements ILoginVM {

    constructor(
        public username?:string, 
        public password?:string,
        public appName?:string,
        public rememberMe?:boolean,
        ) {}
}