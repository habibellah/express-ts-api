import { BookOutput, CreateBookOutput } from "../../application/book/book-output-dto";
import { BookPort } from "../../application/book/book-port";
import {prisma } from "../persistence/prisma-orm-client"

export class BookAdapter implements BookPort{

    async findAll(): Promise<BookOutput[]> {
        const books = await prisma.book.findMany(); 
        return books.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          quantity: book.quantity,
          price: book.price,
        }));
      }
    
   async updateBook(bookOutput: BookOutput): Promise<BookOutput> {
        const { id, title, author, quantity, price } = bookOutput;
      
        return await prisma.book.update({
          where: { id },
          data: {
            title,
            author,
            quantity,
            price,
          },
        }).then((updatedBook) => {
          return {
            id: updatedBook.id,
            title: updatedBook.title,
            author: updatedBook.author,
            quantity: updatedBook.quantity,
            price: updatedBook.price,
          };
        });
      }
      

   async findBookBy(bookId: string): Promise<BookOutput> {
        return await prisma.book.findUnique({
          where: { id: bookId },
        }).then(book => {
          if (!book) {
            throw new Error("book not found");
          }
          return {
            id: book.id,
            title: book.title,
            author: book.author,
            quantity: book.quantity,
            price: book.price,
          };
        });
      }

    save(createBookOutput: CreateBookOutput): Promise<CreateBookOutput> {
       return  prisma.book.create({
        data:{
            id : createBookOutput.id,
            title : createBookOutput.title,
            author : createBookOutput.author,
            quantity : createBookOutput.quantity,
            price : createBookOutput.price
        }
       })
    }
    
}