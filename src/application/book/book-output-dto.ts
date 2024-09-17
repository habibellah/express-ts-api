export class CreateBookOutput{
    constructor(
        public id : string,
        public title : string,
        public author : string,
        public price : number,
        public quantity : number
    ){
    }
}

export class BookOutput{
    constructor(
        public id : string,
        public title : string,
        public author : string,
        public price : number,
        public quantity : number
    ){
    }
}