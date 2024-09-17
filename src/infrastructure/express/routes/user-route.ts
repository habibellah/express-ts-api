import { Router } from "express";
import { login, save } from "../controller/user-controller";


const userRouter = Router();

userRouter.post("/register",save);
userRouter.post("/login",login)

export default userRouter;