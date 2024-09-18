export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string
    ) {}

    static validateUserInfo(name: string, email: string, password: string) {
        if (!name || !email || !password) {
            throw new Error('name and email and password must be provided');
        }
    }
}
