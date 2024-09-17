import { Router} from 'express';
import { getAllBooks, purchaseBookByBookId, save } from '../controller/book-controller';
import { authenticateToken } from '../middleware/authentication-middleware';


const bookRouter = Router();

bookRouter.post("/book",save);
bookRouter.put("/book/:bookId",purchaseBookByBookId);
bookRouter.get("/book",authenticateToken,getAllBooks);

export default bookRouter;