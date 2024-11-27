import React, { useEffect, useState } from 'react'
import ListProduct from '../componentChild/Shop/ListProduct';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductManage = () => {
    const [listProduct,setListProduct] = useState([]);
    const authStore = useSelector(state => state.auth);
    const getProductList = async () =>{
        try{
            const response = await axios.get('http://localhost:8080/shop/shop/productList',{
              headers: {
                'Content-Type': 'application/json',
                 authorization: `Bearer ${authStore.accessToken}`
              },
              //  credentials: 'include'
            });
            if(response.status !== 200){
              // const errorData = await response.json();
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
  return (
    <>
    <div>
    <Link to='addProduct'><button>Thêm sản phẩm</button></Link>
    <Outlet/>
      {listProduct.getListProduct ? (
          <div className='grid grid-cols-5 gap-5 ml-48'>{listProduct.getListProduct.map(item =>(<ListProduct key={item._id} items={item}/>))}</div>
      ) : (
        <p>Loading product information...</p>
      )}
    </div>
    
  </>
  )
}

export default ProductManage