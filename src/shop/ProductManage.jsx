import React, { useEffect, useState } from 'react'
import ListProduct from '../componentChild/Shop/ListProduct';
import { Link, Outlet } from 'react-router-dom';

const ProductManage = () => {
    const [listProduct,setListProduct] = useState([])
    const getProductList = async () =>{
        try{
            const response = await fetch('http://localhost:8080/shop/shop/productList',{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
               credentials: 'include'
            });
            if(!response.ok){
              const errorData = await response.json();
              console.error('Error details:', errorData);
              throw new Error('đăng nhập thất bại');
            }
            const data = await response.json();
            setListProduct(data);
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