export interface IForgotPassword{
    password?: string;
    confirmePassword?: string;
}
export class ForgotPassword implements IForgotPassword{
    constructor(
        public password?: string,
        public confirmePassword?: string
    ){}
}