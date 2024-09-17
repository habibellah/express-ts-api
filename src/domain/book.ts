export class Book{
    constructor(
        public id : string,
        public title: string,
        public author: string,
        public price: number,
        public quantity: number
      ) {}

     static validateBookInfo(title: string, author: string, price: number, quantity: number){
        if(!author || !title) throw new Error('Title and Author must be provided')
        if(quantity < 0 || price < 0) throw new Error('the quantity or price cannot be negative')
      }

      purchase(quantity: number) {
        if (quantity > this.quantity) {
          throw new Error("Not enough stock available");
        }
        this.quantity -= quantity;
      }
}