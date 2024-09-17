import { CreateUserInput, LoginUserInput } from '../../../application/user/user-input-dto';
import { Request, Response } from 'express';
import {createUserAccount, loginUser} from "../../../application/user/user-usecase"
import { UserAdapter } from "../../persistence/user-adapter";
import jwt from 'jsonwebtoken';




const userAdapter = new UserAdapter()

export const save =async (req : Request,res : Response)=>{
try{
  const {name,email,password} = req.body
  const createUserInput = new CreateUserInput(name,email,password);
  const createUserOutput = await createUserAccount(createUserInput,userAdapter);
  const token = jwt.sign({id : createUserOutput.id,email : createUserOutput.email}, process.env.SECRET_KEY || 'SECRET',{expiresIn: '1h'});
    res.status(201).json({ token, user: { id: createUserOutput.id, email: createUserOutput.email, name: createUserOutput.name } });
}catch(error){
    console.error(error);
    res.status(404).json({ error: `${error}` });
}
}

export const login = async (req : Request, res : Response) =>{
  try{
    const {email, password } = req.body;
    const loginUserInput = new LoginUserInput(email,password);
    const loginUserOutput = await loginUser(loginUserInput,userAdapter)
    const token = jwt.sign({id : loginUserOutput.id,email : loginUserOutput.email}, process.env.SECRET_KEY || 'SECRET',{expiresIn: '1h'});
    res.status(200).json({ token, user: { id: loginUserOutput.id, email: loginUserOutput.email, name: loginUserOutput.name } });
  }catch(error){
    console.error(error);
    res.status(404).json({ error: `${error}` });
  }
}