import { Book } from "../../src/domain/book";

describe('Book Model', () => {

    describe('constructor', () => {
        it('should create a new Book instance with valid data', () => {
            const book = new Book('1', 'Clean Code', 'Robert C Martin', 15.99, 10);

            expect(book.id).toBe('1');
            expect(book.title).toBe('Clean Code');
            expect(book.author).toBe('Robert C Martin');
            expect(book.price).toBe(15.99);
            expect(book.quantity).toBe(10);
        });
    });

    describe('validateBookInfo', () => {
        it('should not throw an error when valid book information is provided', () => {
            expect(() => {
                Book.validateBookInfo('Clean Code', 'Robert C Martin', 15.99, 10);
            }).not.toThrow();
        });

        it('should throw an error when title is missing', () => {
            expect(() => {
                Book.validateBookInfo('', 'Robert C Martin', 15.99, 10);
            }).toThrow('Title and Author must be provided');
        });

        it('should throw an error when author is missing', () => {
            expect(() => {
                Book.validateBookInfo('Clean Code', '', 15.99, 10);
            }).toThrow('Title and Author must be provided');
        });

        it('should throw an error when price is negative', () => {
            expect(() => {
                Book.validateBookInfo('Clean Code', 'Robert C Martin', -15.99, 10);
            }).toThrow('the quantity or price cannot be negative');
        });

        it('should throw an error when quantity is negative', () => {
            expect(() => {
                Book.validateBookInfo('Clean Code', 'Robert C Martin', 15.99, -10);
            }).toThrow('the quantity or price cannot be negative');
        });
    });

    describe('purchase', () => {
        it('should reduce the quantity when a valid purchase is made', () => {
            const book = new Book('1', 'Clean Code', 'Robert C Martin', 15.99, 10);
            book.purchase(3);

            expect(book.quantity).toBe(7);
        });

        it('should throw an error if the quantity requested exceeds available stock', () => {
            const book = new Book('1', 'Clean Code', 'Robert C Martin', 15.99, 5);

            expect(() => {
                book.purchase(6);
            }).toThrow('Not enough stock available');
        });
    });
});
