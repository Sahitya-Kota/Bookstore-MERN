import React,{useState, useEffect} from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

const EditBook = () => {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setYear] = useState('');
  //const [id,setId] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  {console.log(id)}
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setAuthor(response.data.author)
        setTitle(response.data.title)
        setYear(response.data.publishYear)
        //setId(response.data.id)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('An error occured, check console')
        console.log(error)
      })
  },[])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch((error)=>{
        setLoading(false);
        console.log(error);
        alert('An error occured, check console');
      })

  }
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Edit Book</h1>
        { loading ? ( <Spinner/>):(
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' >
            <div className='my-4'>
              <label className = 'text-xl mr-4 text-gray-500'>Title</label>
                <input type="text" value={title} onChange={(x)=>setTitle(x.target.value)} 
                       className = 'border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
              <label className = 'text-xl mr-4 text-gray-500'>Author</label>
                <input type="text" value={author} onChange={(x)=>setAuthor(x.target.value)} 
                       className = 'border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
              <label className = 'text-xl mr-4 text-gray-500'>Year Published</label>
                <input type="text" value={publishYear} onChange={(x)=>setYear(x.target.value)} 
                       className = 'border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            {/* <div className='my-4'>
              <label className = 'text-xl mr-4 text-gray-500'>ID</label>
                <input type="text" value={id} onChange={(x)=>setId(x.target.value)} 
                       className = 'border-2 border-gray-500 px-4 py-2 w-full'/>
            </div> */}
            <button type="submit" className='p-2 bg-sky-500 m-8' onClick={handleEditBook}>Save</button>
          </div>
        )}
    </div>
  )
}

export default EditBook;