import { CreateUserOutput, LoginUserOutput } from "./user-output-dto";

export interface UserPort{
     save(createUserOutput : CreateUserOutput) : Promise<CreateUserOutput>
     verifyUserCredentials(email : string, password : string) : Promise<LoginUserOutput>
}