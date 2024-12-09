import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../jwt/refreshAccessToken';
const ProductByCategory = () => {
  const navigate = useNavigate();
  const authStore = useSelector(state => state.auth);
  const { name } = useParams();
  const [data, setData] = useState([]);
  const productList = async () => {
    try {
      const response = await axiosInstance.post('/users/productByCategory', { nameCategory: name })
      if (response.status !== 200) throw new Error('Error')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleProductDetail = (idProduct) => {
    navigate(`/productDetail/${idProduct}`)

  }
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
      },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${authStore.accessToken}`
        //   },
        // }
      )
      if (res.status !== 200) {
        toast.error('Fail to add Product');
        throw new Error('đăng nhập thất bại');
      }
      toast.success('Add product success')
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    productList();
  }, [name])
  return (
    <>
      <div className='grid grid-cols-5 gap-5 ml-40 mr-40 mt-12'>

        {data ? data.map(product =>
          <div className="relative w-full group border border-gray-200 rounded-lg shadow-md  hover:shadow-2xl p-4 bg-white flex flex-col justify-between">
            {product.image ? product.image.map(image =>
              <img
                className="w-full  object-cover rounded-t-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
                src={image}
                alt=""
              />
            ) : (
              <p className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-t-lg">
                img...
              </p>
            )}
            <div className="text-center mt-4">
              <p
                onClick={() => handleProductDetail(product._id)}
                className="font-semibold cursor-pointer hover:text-blue-600">{product.productName}</p>
              <p className="text-gray-600 mt-1">Price: ${product.price}</p>
            </div>
            <button
              onClick={() => addToCart(product._id, product.price, product.quantity)}
              className="bg-black text-white w-full py-2 mt-4 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            >
              Add to cart
            </button>
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
          </div>
        )
          :
          <p>Loading...</p>}
      </div>
    </>
  )
}

export default ProductByCategory