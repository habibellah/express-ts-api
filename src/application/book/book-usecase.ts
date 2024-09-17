import exp from "constants"
import { BookOutput, CreateBookOutput } from "./book-output-dto"
import { BookPort } from './book-port';
import { Book } from "../../domain/book";
import { CreateBookInput } from "./book-input-dto";



export async function saveBook(createBookInput : CreateBookInput,bookPort : BookPort){
    const {title ,author ,price ,quantity} = createBookInput
    Book.validateBookInfo(title,author,price,quantity)
    const id = Math.random().toString()
    const book = new Book(id,title,author,price,quantity)
   return await bookPort.save(new CreateBookOutput(book.id,book.title,book.author,book.price,book.quantity))
}

export async function purchaseBook(bookId : string,bookPort : BookPort){
    const bookInput = await bookPort.findBookBy(bookId);
    const book = new Book(bookInput.id,bookInput.title,bookInput.author,bookInput.price,bookInput.quantity);
    if(!book){
        throw new Error("Book not found");
    }
    book.purchase(2);
   return await bookPort.updateBook(new BookOutput(book.id,book.title,book.author,book.price,book.quantity))
}

export async function listBooks(BookPort : BookPort){
    return await BookPort.findAll();
}