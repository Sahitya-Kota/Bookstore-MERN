import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {PiBookOpenTextLight} from 'react-icons/pi'
import {BiUserCircle} from 'react-icons/bi'

const BookModel = ({book, onClose}) => {
  return (
    <div className='w-full fixed bg-black bg-opacity-60 top-0 right-0 bottom-0 z-50 flex justify-center items-center'
         onClick = {onClose}>
        <div onClick={(event) => event.stopPropagation()}
             className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'>
            <AiOutlineClose className='absolute right-6 top-4 text-3xl  rounded-xl bg-red-300 cursor-pointer'
                            onClick = {onClose}/>
            <h2 className='w-fit px-4 py-1 bg-red-300  rounded-lg'>
                {book.publishYear}
            </h2>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2xl' />
                <h2 className='my-1'>{ book.title }</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{ book.author }</h2>
            </div>
                <p className='mt-4'>Preview</p>
                <p className='my-2'> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                 Blanditiis, officiis quos voluptate libero enim laboriosam culpa accusantium 
                 nesciunt laudantium repellat quam consequuntur porro a quas voluptatum beatae 
                 harum iure tenetur.
                </p>
        </div>

    </div>
  )
}

export default BookModel