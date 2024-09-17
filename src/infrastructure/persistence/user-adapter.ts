import { CreateUserOutput, LoginUserOutput } from "../../application/user/user-output-dto";
import { UserPort } from "../../application/user/user-port";
import {prisma } from "../persistence/prisma-orm-client"
import  bcrypt  from 'bcryptjs'

export class UserAdapter implements UserPort{

  async verifyUserCredentials(email: string, password: string): Promise<LoginUserOutput> {
      const existingUser = await prisma.user.findUnique({where : {email}});
      if(!existingUser){
        throw new Error("The Current User is Not Exist")
      }
      const PasswordValid = await bcrypt.compare(password,existingUser.password)
      if(!PasswordValid){
        throw new Error("The Password is Not Valid")
      }
      return new LoginUserOutput(existingUser.id,existingUser.email,existingUser.name)
   }


   async save(createUserOutput: CreateUserOutput): Promise<CreateUserOutput> {
        const hashedPassword = await bcrypt.hash(createUserOutput.password,10);
        return prisma.user.create({
            data:{
                id : createUserOutput.id,   
                name  : createUserOutput.name,
                email : createUserOutput.email,
                password : hashedPassword
            }
        })
    }

}