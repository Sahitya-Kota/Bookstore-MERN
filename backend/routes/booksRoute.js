import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//  Creating a new Book object and saving it 
//  route for saving a new Book
router.post('/', async (request,response) => {
    try{
        if (
        !request.body.title ||
        !request.body.author ||
        !request.body.id 
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, id'
            });
        }
        // trying to request all fields req if fails send error 400
        // creating a new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            id: request.body.id,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
});


// Route for getting all books data from db
router.get('/', async (request,response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data : books
        });
    }
    catch (error){
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
});


// getting a specific book from db by id
router.get('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const books = await Book.findById(id);
        return response.status(200).json(books)
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})


// Updating a Book with mongoose
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author 
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, id',
            })
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body)
        if(!result)
            return response.status(404).send({message: 'Book not found'});
        return response.status(200).send({message: 'Book updated successfully'})
    }
    catch (error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})


// Deleting a Book 
router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result)
            return response.status(404).send({message: 'Book not found'});
        return response.status(200).send({message: 'Book deleted successfully'})
    }
    catch (error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

export default router;
