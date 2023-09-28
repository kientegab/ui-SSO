export interface ILoginVM {
    username?:string;
    password?:string;
    rememberMe?:boolean;
}

export class LoginVM implements ILoginVM {

    constructor(
        public username?:string, 
        public password?:string,
        public rememberMe?:boolean,
        ) {}
}