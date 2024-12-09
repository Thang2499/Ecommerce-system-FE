import React from 'react'
import { Link } from 'react-router-dom';
const ViewCartChild = ({items}) => {
const {productId,quantity,totalPrice,unitPrice} = items
  return (
<>
        <div className='flex'>
          <div className=' ml-32 mr-28 mt-12 w-full '>
            <div className='flex mb-8 border h-20 p-4 shadow-md'>
              <div className='flex w-60'>
              {productId.image.map((item,index) => <img key={index} src={item} />)}
              <h2 className='text-sm w-44 pt-3'>{productId.productName}</h2>
              </div>
              <p className='ml-36 text-center w-12 pt-2 '>${unitPrice}</p>
              <div className='w-96 justify-center ml-44 flex'>

                <button
                  className='px-2 h-8 mt-1 bg-gray-300 '
                  // onClick={() => decreaseQuantity(index)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <p className=' text-center text-xl pt-1 w-8'> {quantity}</p>
                <button
                  className='px-2  h-8 mt-1 bg-gray-300'
                // onClick={() => increaseQuantity(index)}
                >
                  +
                </button>
              </div>
              <p className='ml-48 pt-2'>${totalPrice}</p>
            </div>
          </div>
        </div>


      </>
  )
}

export default ViewCartChild