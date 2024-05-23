
  /* 
  here 2 useState hooks are being used 1 for updating books data and other for
  showing the loading screen
  the useEffect hook first begins loading screen then pings /books if there is 
  a response the data from response is read and loading is set to false (even if
  an error occurs)
  The home ele then returns the table of data read from books and is displayed 
  with details, edit, delete and  
  */


import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import {Link}  from 'react-router-dom';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setType] = useState('card');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }, [])
  return (
    <div className='p-4'>
      <div className='flex  gap-3 items-center '>
        <button className='bg-red-300 px-4 py-1 rounded-lg text-white'
                onClick = {() => setType('Cards')}>Card View</button>
        <button className='bg-red-300 px-4 py-1 rounded-lg text-white'
                onClick = {() => setType('table')}>Table View</button>
      </div>
      <div className = 'flex justify-between items-center'>
        <h1 className = 'text-7xl my-8 '>BOOKS</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className = 'text-sky-800 text-4xl'></MdOutlineAddBox>
        </Link>
      </div>
      {loading ?  (<Spinner/>) :  (showType === 'table' ? 
                  (<BooksTable books = {books}/> ) : ( <BooksCard books={books}/> ))}
    </div>
  );
}
export default Home