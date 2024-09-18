import { createUserAccount, loginUser} from '../../../src/application/user/user-usecase';
import { FakeUserAdapter } from '../../infrastructure/persistence/fake-user-adapter';
import { CreateUserInput, LoginUserInput} from '../../../src/application/user/user-input-dto';
import { LoginUserOutput, CreateUserOutput } from '../../../src/application/user/user-output-dto';

describe('User Use Cases', () => {
    let fakeUserAdapter: FakeUserAdapter;

    beforeEach(() => {
        fakeUserAdapter = new FakeUserAdapter();
    });

    describe('createUserAccount', () => {
        it('should create a new user and return the created user', async () => {
            const createUserInput: CreateUserInput = {
                name: 'Alice',
                email: 'alice@example.com',
                password: 'securePassword',
            };

            const createdUser = await createUserAccount(createUserInput, fakeUserAdapter);

            expect(createdUser.name).toBe('Alice');
            expect(createdUser.email).toBe('alice@example.com');
            expect(createdUser.password).toBe('securePassword');
        });

        it('should throw an error if name is missing', async () => {
            const createUserInput: CreateUserInput = {
                name: '',
                email: 'alice@example.com',
                password: 'securePassword',
            };

            await expect(createUserAccount(createUserInput, fakeUserAdapter))
                .rejects
                .toThrow('name and email and password must be provided');
        });

        it('should throw an error if email is missing', async () => {
            const createUserInput: CreateUserInput = {
                name: 'Alice',
                email: '',
                password: 'securePassword',
            };

            await expect(createUserAccount(createUserInput, fakeUserAdapter))
                .rejects
                .toThrow('name and email and password must be provided');
        });

        it('should throw an error if password is missing', async () => {
            const createUserInput: CreateUserInput = {
                name: 'Alice',
                email: 'alice@example.com',
                password: '',
            };

            await expect(createUserAccount(createUserInput, fakeUserAdapter))
                .rejects
                .toThrow('name and email and password must be provided');
        });
    });

    describe('loginUser', () => {
        it('should return user details if credentials are correct', async () => {
            const createUserInput: CreateUserInput = {
                name: 'Alice',
                email: 'alice@example.com',
                password: 'securePassword',
            };

            await createUserAccount(createUserInput, fakeUserAdapter);

            const loginUserInput: LoginUserInput = {
                email: 'alice@example.com',
                password: 'securePassword',
            };

            const loginUserOutput = await loginUser(loginUserInput, fakeUserAdapter);

            expect(loginUserOutput.id).toBeTruthy();
            expect(loginUserOutput.name).toBe('Alice');
            expect(loginUserOutput.email).toBe('alice@example.com');
        });

        it('should throw an error if credentials are incorrect', async () => {
            const loginUserInput: LoginUserInput = {
                email: 'nonexistent@example.com',
                password: 'wrongPassword',
            };

            await expect(loginUser(loginUserInput, fakeUserAdapter)).rejects.toThrow('Invalid email or password');
        });
    });
});
