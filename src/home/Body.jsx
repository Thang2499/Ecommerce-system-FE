import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeChild from '../componentChild/homeChild';
// import '../componentChild/homeChild.css'
const Body = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const moveToLeft = () => {
    if (query.page === 1) return
    setQuery(pre => ({
      ...pre,
      page: pre.page - 1
    }
    ))
  }
  const moveToRight = () => {
    setQuery(pre => ({
      ...pre,
      page: pre.page + 1
    }
    ))
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get( 'http://localhost:8080/users/list',{
          headers: {
            'Content-Type': 'application/json'
          }},{
            params: query,
            // withCredentials: true,
          }
        )
        setData(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [query]);
  return (
    <>
     <div className='mt-12'>
        {data ? (<div className='grid grid-cols-5 gap-5 ml-48'>{data.map(item => (<HomeChild key={item.id} items={item} />))}</div>) : <p>Loading</p>}
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={moveToLeft}
          disabled={query.page === 1}
          className={`${query.page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            } font-bold py-2 px-4 rounded shadow-lg transition duration-300`}
        >
          Left
        </button>
        <span className="text-lg font-semibold text-gray-700">{query.page}</span>
        <button
          onClick={moveToRight}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
        >
          Right
        </button>
      </div>


     
    </>
  )
}

export default Body