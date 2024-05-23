import express, { request, response } from 'express';   // importing express utilities
import { port,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app  = express();     // variable for express app

/*
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
} ) 
adding above to database connection step since express.js listen shld 
only work if the database connection is successful
*/

/* basic server created, here lang used is js
   servers backend framework is express js
   this server can run on any machine w/ node.js  */

// server at this point gives 404 error Cannot get /
app.get('/', (request,response) => {
    return response.status(234).send('Welcome to the Main page!!')
});

// adding middleware for parsing requests
app.use(express.json());

// connecting to a database cluster
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Database connected')
        // express js port connection
        app.listen(port, () => {
            console.log(`Listening to port ${port}`)
        } )
    })
    .catch((error) => {
        console.log(error)
    });

/*

//  Creating a new Book object and saving it 
//  route for saving a new Book
app.post('/books', async (request,response) => {
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
app.get('/books', async (request,response) => {
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
app.get('/books/:id', async (request, response) => {
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
app.put('/books/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.id ||
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
app.delete('/books/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.id ||
            !request.body.author 
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, id',
            })
        }
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
*/

//Refractoring above code using express router
/* the above code is simple but it is very repetetive and if we have more
   than a few models by first creating a routes folder with BooksRoute.js
    for Books model */
app.use('/books', booksRoute);

// using cors
app.use(cors()) //simple
/*app.get('/books/:id',function(req,res,next){
    res.json({msg: 'cors-enabled'})
}) */


/* app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization","Content-Type"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
 );
 */
/* app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
})) 
app.use(cors({
    origin: 'http://localhost:5173/:id',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
})) 
 */