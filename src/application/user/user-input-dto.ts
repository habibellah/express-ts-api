export class CreateUserInput{
    constructor(
        public name : string,
        public email : string,
        public password : string
    ){}
}

export class LoginUserInput{
    constructor(
        public email : string,
        public password : string
    ){}
}