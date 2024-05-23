// Book Model 
import mongoose from 'mongoose';
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        publishYear: {
            type: Number,
            required: false,
        }
    }
)
//export const Book = mongoose.model('Book', {title: String, author: String, Id: int})
export const Book = mongoose.model('Book', bookSchema)
