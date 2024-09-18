import { User } from "../../domain/user";
import { CreateUserInput, LoginUserInput } from "./user-input-dto";
import { CreateUserOutput, LoginUserOutput } from './user-output-dto';
import { UserPort } from "./user-port";


export async function createUserAccount(createUserInput : CreateUserInput,userPort : UserPort){
    const {name ,email ,password} = createUserInput 
    User.validateUserInfo(name,email,password)
    const id = Math.random().toString();
    const user = new User(id,name,email,password);
    return await userPort.save(new CreateUserOutput(user.id,user.name,user.email,user.password)); 
}

export async function loginUser(loginUserInput : LoginUserInput,userPort : UserPort){
    const {email, password} = loginUserInput;
    const loginUserOutput = await userPort.verifyUserCredentials(email,password)
    return loginUserOutput
  }
