import express from 'express'
import bookRouter from './routes/book-route'
import userRouter from './routes/user-route';


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 6000;

app.use("/api/v1",bookRouter);
app.use("/api/v1/user",userRouter)
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status : 'fail',
        message : `Can't find ${req.originalUrl} on this server!`
    })
});

app.listen(PORT,()=>{
    console.log(`the app is running on port: ${PORT}`)
});