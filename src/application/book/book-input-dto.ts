export class CreateBookInput{
    constructor(
        public title : string,
        public author : string,
        public quantity : number,
       public price : number,
    ){
    }
}

export class BookInput{
    constructor(
        public id : string,
        public title : string,
        public author : string,
        public quantity : number,
       public price : number,
    ){
    }
}