export class CreateUserOutput{
    constructor(
        public id : string,
        public name : string,
        public email : string,
        public password : string
    ){}
}

export class LoginUserOutput{
    constructor(
        public id : string,
        public email : string,
        public name : string
    ){}
}
