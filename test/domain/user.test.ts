import { describe } from "node:test";
import { User } from "../../src/domain/user";


describe('User Model',()=>{
    describe('constructor',()=>{
        it('should create a new user instance with valid data',()=>{
            const user = new User('1', 'habibellah', 'habib@example.com', 'securePassword');
            expect(user.id).toBe('1');
            expect(user.name).toBe('habibellah');
            expect(user.email).toBe('habib@example.com');
            expect(user.password).toBe('securePassword');
        });
    });
    describe('ValidateUserInfo',()=>{
        it('should not throw error when valid user information is provided',()=>{
            expect(()=>{
                User.validateUserInfo('habibellah', 'habib@example.com', 'securePassword');
            }).not.toThrow();
        });
        it('should throw an error when name is missing', () => {
            expect(() => {
                User.validateUserInfo('', 'habib@example.com', 'securePassword');
            }).toThrow('name and email and password must be provided');
        });

        it('should throw an error when email is missing', () => {
            expect(() => {
                User.validateUserInfo('habibellah', '', 'securePassword');
            }).toThrow('name and email and password must be provided');
        });

        it('should throw an error when password is missing', () => {
            expect(() => {
                User.validateUserInfo('habibellah', 'habib@example.com', '');
            }).toThrow('name and email and password must be provided');
        });
    });
});