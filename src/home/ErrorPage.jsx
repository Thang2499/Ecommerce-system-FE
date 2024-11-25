import React from 'react'
import { useParams } from 'react-router-dom'

const ErrorPage = () => {
    const params = useParams();
  return (
    <div className='text-7xl text-center mt-32 mb-32'>404 NOT FOUND</div>
  )
}

export default ErrorPage