import { saveBook, purchaseBook, listBooks } from '../../../src/application/book/book-usecase';
import { FakeBookAdapter } from '../../infrastructure/persistence/fake-book-adapter';
import { CreateBookInput } from '../../../src/application/book/book-input-dto';

describe('Book Use Cases', () => {
    let fakeBookAdapter: FakeBookAdapter;

    beforeEach(() => {
        fakeBookAdapter = new FakeBookAdapter();
    });

    describe('saveBook', () => {
        it('should save a new book and return the saved book', async () => {
            const createBookInput: CreateBookInput = {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                price: 29.99,
                quantity: 10,
            };

            const savedBook = await saveBook(createBookInput, fakeBookAdapter);

            expect(savedBook.title).toBe('Clean Code');
            expect(savedBook.author).toBe('Robert C. Martin');
            expect(savedBook.price).toBe(29.99);
            expect(savedBook.quantity).toBe(10);
        });

        it('should throw an error when book information is invalid', async () => {
            const createBookInput: CreateBookInput = {
                title: '',
                author: '',
                price: -29.99,
                quantity: -10,
            };

            await expect(saveBook(createBookInput, fakeBookAdapter)).rejects.toThrow('Title and Author must be provided');
        });
    });

    describe('purchaseBook', () => {
        it('should reduce the quantity of a book after purchase', async () => {
            const createBookInput: CreateBookInput = {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                price: 29.99,
                quantity: 10,
            };

            const savedBook = await saveBook(createBookInput, fakeBookAdapter);

            const updatedBook = await purchaseBook(savedBook.id, fakeBookAdapter);

            expect(updatedBook.quantity).toBe(8);  
        });

        it('should throw an error if purchasing more than available quantity', async () => {
            const createBookInput: CreateBookInput = {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                price: 29.99,
                quantity: 1,
            };

            const savedBook = await saveBook(createBookInput, fakeBookAdapter);

            // Try purchasing more than available stock
            await expect(purchaseBook(savedBook.id, fakeBookAdapter)).rejects.toThrow('Not enough stock available');
        });

        it('should throw an error if book is not found', async () => {
            await expect(purchaseBook('non-existing-id', fakeBookAdapter)).rejects.toThrow('Book not found');
        });
    });

    describe('listBooks', () => {
        it('should return all books', async () => {
            const book1: CreateBookInput = {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                price: 29.99,
                quantity: 10,
            };

            const book2: CreateBookInput = {
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt',
                price: 25.99,
                quantity: 5,
            };

            // Save both books
            await saveBook(book1, fakeBookAdapter);
            await saveBook(book2, fakeBookAdapter);

            const books = await listBooks(fakeBookAdapter);

            expect(books.length).toBe(2);
            expect(books[0].title).toBe('Clean Code');
            expect(books[1].title).toBe('The Pragmatic Programmer');
        });

        it('should return an empty list if no books exist', async () => {
            const books = await listBooks(fakeBookAdapter);
            expect(books.length).toBe(0);
        });
    });
});
