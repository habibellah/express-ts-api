import { UserPort } from "../../../src/application/user/user-port";
import { LoginUserOutput,CreateUserOutput } from '../../../src/application/user/user-output-dto';

export class FakeUserAdapter implements UserPort {
    private users: Map<string, CreateUserOutput> = new Map();

    async save(createUserOutput: CreateUserOutput): Promise<CreateUserOutput> {
        this.users.set(createUserOutput.id, createUserOutput);
        return createUserOutput;
    }

    async verifyUserCredentials(email: string, password: string): Promise<LoginUserOutput> {
        for (const user of this.users.values()) {
            if (user.email === email && user.password === password) {
                return new LoginUserOutput(user.id, user.email, user.name);
            }
        }
        throw new Error("Invalid email or password");
    }
}
