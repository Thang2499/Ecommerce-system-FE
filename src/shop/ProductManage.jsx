import React, { useEffect, useState } from 'react'
import ListProduct from '../componentChild/Shop/ListProduct';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from './Modal';
import AddProductForm from '../componentChild/Shop/AddProductForm';
import axiosInstance from '../jwt/refreshAccessToken';
const ProductManage = () => {
    const [listProduct,setListProduct] = useState([]);
    const authStore = useSelector(state => state.auth);
    // console.log(authStore)
    const getProductList = async () =>{
        try{
            const response = await axiosInstance.get('/shop/shop/productList',
            //   {
            //   headers: {
            //     'Content-Type': 'application/json',
            //      authorization: `Bearer ${authStore.accessToken}`
            //   },
            //    credentials: 'include'
            // }
          );
            if(response.status !== 200){
              console.error('Error details:', response.message);
              throw new Error('đăng nhập thất bại');
            }
            setListProduct(response.data);
          }catch(err){
            console.error(err);
          }
      }
   
      useEffect(() => {
        getProductList();
      }, []);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
  return (
    <>
    <div>
    {/* <Link to='addProduct'><button className='p-2 mt-4 text-center  border rounded-md  shadow-sm bg-green-500 hover:bg-green-600 hover:text-white'>Thêm sản phẩm</button></Link> */}
    {/* <Outlet/> */}
    <Link to="#" onClick={openModal}>
        <button className="p-2 mt-4 text-center border rounded-md shadow-sm bg-green-500 hover:bg-green-600 hover:text-white">
          Thêm sản phẩm
        </button>
      </Link>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <AddProductForm closeModal={closeModal} />
      </Modal>
      {listProduct.getListProduct ? (
          <div className='grid grid-cols-5 gap-5 mr-48 ml-48'>{listProduct.getListProduct.map(item =>(<ListProduct key={item._id} items={item}/>))}</div>
      ) : (
        <div class="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
    
  </>
  )
}

export default ProductManage