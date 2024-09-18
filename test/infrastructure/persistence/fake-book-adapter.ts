import { BookPort } from '../../../src/application/book/book-port';
import { BookInput } from '../../../src/application/book/book-input-dto';
import { CreateBookOutput ,BookOutput} from '../../../src/application/book/book-output-dto';

export class FakeBookAdapter implements BookPort {
    private books: Map<string, BookInput> = new Map();

    async save(createBookOutput: CreateBookOutput): Promise<CreateBookOutput> {
        this.books.set(createBookOutput.id, createBookOutput);
        return createBookOutput;
    }

    async findBookBy(bookId: string): Promise<BookInput> {
        const book = this.books.get(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }

    async updateBook(bookOutput: BookOutput): Promise<BookOutput> {
        const existingBook = this.books.get(bookOutput.id);
        if (!existingBook) {
            throw new Error("Book not found");
        }
        this.books.set(bookOutput.id, bookOutput);
        return bookOutput;
    }

    async findAll(): Promise<BookOutput[]> {
        return Array.from(this.books.values());
    }
}
