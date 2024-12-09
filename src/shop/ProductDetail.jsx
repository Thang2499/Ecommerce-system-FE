import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Error from '../image/imageError.svg';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../jwt/refreshAccessToken';
const ProductDetail = () => {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1)
  const authStore = useSelector(state => state.auth);
  const { id } = useParams();
  const getProductDetail = async () => {
    try {
      const response = await axiosInstance.post('/users/productDetail', { id: id })
      if (response.status !== 200) throw new Error('Error')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProductDetail()
  }, [])
  const addToCart = async (id, price, quantity) => {
    if (authStore.isAuth === false) {
      toast.info('Đang nhập để mua hàng')
      return;
    }
    try {
      const res = await axiosInstance.post('/users/addToCart', {
        id: authStore.user._id,
        productId: id,
        quantity: quantity,
        unitPrice: price,
      })
      if (res.status !== 200) {
        toast.error('Fail to add Product');
        throw new Error('đăng nhập thất bại');
      }
      toast.success('Add product success')
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {data ? (
        <div className="bg-gray-100 h-svh flex flex-wrap p-8">
          {/* Vùng ảnh */}
          <div className="w-1/2">
            <div key={data._id} className="ml-6 md:ml-24">
              {data.image &&
                data.image.map((image, index) => (
                  <img
                    key={index}
                    className="bg-custom-gray w-full h-96 p-2 mx-auto object-cover"
                    src={image}
                  />
                ))}
            </div>
            <div className="ml-8 md:ml-36 flex flex-wrap justify-start mt-4 gap-2">
              {data.imageDetail ? (
                data.imageDetail.map((imgDetail, idx) => (
                  <img
                    key={idx}
                    className="w-20 md:w-1/5 cursor-pointer border border-gray-300 rounded-lg"
                    src={imgDetail}
                  />
                ))
              ) : (
                <p>Image loading...</p>
              )}
            </div>
          </div>
          {/* Vùng thông tin sản phẩm */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <p className="text-xl font-bold">{data.productName}</p>
            <p className="text-lg text-green-600">${data.price}</p>
            <p className="text-gray-600 mt-4">{data.description}</p>
            <div className="flex items-center mt-6">
              <span className="font-medium text-gray-700">Số lượng</span>
              <div className="ml-4 flex items-center space-x-4">
                <button
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="w-8 h-8 bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 rounded">
                  -
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 rounded">
                  +
                </button>
              </div>
            </div>
            <button
              className="bg-black  transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300 text-white w-1/4 py-2 mt-4 rounded-md "
              onClick={() => addToCart(data._id,data.price,quantity)}
            >Add to cart</button>
          </div>
          <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
/> 
<div className='ml-24 bg-white w-full'>
  <p>Comment</p>
  <input type="text" />
</div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Loading...</p>
      )}
    </>

  )
}

export default ProductDetail