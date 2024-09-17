import { BookInput } from './book-input-dto';
import { BookOutput, CreateBookOutput } from './book-output-dto';

export interface BookPort{
    save(createBookOutput : CreateBookOutput) : Promise<CreateBookOutput>
    findBookBy(bookId : string) : Promise<BookInput>
    updateBook(bookOuptut : BookOutput) : Promise<BookOutput>
    findAll():Promise<BookOutput[]>
}