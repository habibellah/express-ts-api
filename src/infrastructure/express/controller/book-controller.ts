import { Request, Response } from 'express';
import { BookAdapter } from '../../persistence/book-adapter';
import { CreateBookInput } from '../../../application/book/book-input-dto';
import { listBooks, purchaseBook, saveBook } from '../../../application/book/book-usecase';


const bookAdapter = new BookAdapter()

export const save =async (req : Request,res : Response)=>{
try{
  const {title,author,quantity,price} = req.body
  const createBookInput = new CreateBookInput(title,author,quantity,price);
  const createBookOutput = await saveBook(createBookInput,bookAdapter);
  res.status(201).json(createBookOutput);
}catch(error){
    console.error(error);
    res.status(404).json({ error: `${error}` });
}
}

export const purchaseBookByBookId = async(req : Request, res : Response) =>{
  try{
    const {bookId} = req.params
    const bookOutput = await purchaseBook(bookId,bookAdapter)
    res.status(200).json(bookOutput)
  }catch(error){
    console.error(error);
    res.status(404).json({ error: `${error}` });
  }
}

export const getAllBooks = async(req : Request, res : Response) =>{
try{
    const bookListOutput = await listBooks(bookAdapter);
    res.status(200).json(bookListOutput);
}catch(error){
  console.error(error);
    res.status(404).json({ error: `${error}` });
}
}