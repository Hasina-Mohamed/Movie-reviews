import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { removeBookmark } from '../redux/slices/bookmarkSlice'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Bookmark = () => {
  const dispatch = useDispatch();
  const bookMarks = useSelector(state => state.bookmark.bookmarkedMovies)
  const [auth, setAuth] = useState(false);
  const userToken = Cookies.get('userToken');
  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [])
  const [searchByTitle, setSearchByTitle] = useState('')

  console.log(bookMarks);
  return (
    <div className='w-full'>
      <div className='w-[95%] flex flex-row justify-between items-center gap-2'>
        <h1 className='text-base font-medium'> All Movies ( {bookMarks?.length} )</h1>
        <input type="text" placeholder='Search Movie title '
          className='p-3 text-black rounded shadow border w-[50%]' onChange={(e) => setSearchByTitle(e.target.value)} />
      </div>
      <div className='w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {
          bookMarks?.filter(res => {
            return res.title.toLowerCase().includes(searchByTitle.toLowerCase())
          })?.map(movie => {
            return <div key={movie?.id} className=' relative group w-full space-y-3 bg-[#161D2F] p-3 rounded hover:scale-105 transition-all duration-500
          cursor-pointer'>
              {
                auth && <div className="absolute w-full h-full bg-black/20 group -bottom-10 
              group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300
              flex flex-col justify-end items-end gap-5">
                  <MdDelete
                    onClick={() => dispatch(removeBookmark(movie))}
                    className="text-white bg-[#10141F] p-2 rounded-full shadow mr-5 mb-5" size={40} />
                </div>
              }
              <Link className='w-full block relative h-60 ' state={movie}
                to={`/movie-detail/${movie?.id}`}>
                <img
                  className='absolute w-full h-full object-center object-cover rounded'
                  src={`${'https://image.tmdb.org/t/p/w500' + movie?.backdrop_path || 'https://image.tmdb.org/t/p/w500' + movie?.poster_path}`}
                  alt=""
                />
              </Link>
              <div className="flex flex-col justify-start items-start gap-1">
                <span className=" text-lg text-gray-400 capitalize space-x-1">title :<small className="text-white ml-2">{movie?.title}</small></span>
                <span className=" text-lg text-gray-400 capitalize space-x-1">original_language :<small className="text-white ml-2">{movie?.original_language}</small></span>
                <span className=" text-lg text-gray-400 capitalize space-x-1">vote_average :<small className="text-white ml-2">{movie?.vote_average}</small></span>
                <span className=" text-lg text-gray-400 capitalize space-x-1">vote_count :<small className="text-white ml-2">{movie?.vote_count}</small></span>
                {/* <BsFillPlusCircleFill size={25} className="mt-2 cursor-pointer text-white" onClick={() => handleMovies(movie?.id)} /> */}
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Bookmark