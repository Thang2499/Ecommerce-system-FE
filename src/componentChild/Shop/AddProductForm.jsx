import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../jwt/refreshAccessToken';
const AddProductForm = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [des, setDes] = useState('');
    const [files, setFiles] = useState(null); 
    const authStore = useSelector(state => state.auth);
    const handleAddProduct = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('Des', des);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]); 
            }
        }
        try {
            const response = await axiosInstance.post('shop/shop/addProduct', 
            formData,
                {
                    headers: {
                   'Content-Type': 'multipart/form-data',
                //    authorization: `Bearer ${authStore.accessToken}`
                 },
                //  withCredentials: true,
                 }
            );

            if (response.status !== 200) {
                const errorData = await response.message;
                console.error('Error details:', errorData);
                throw new Error('Failed to add product');
            }
            const data = await response.data;
            console.log('Product added successfully:', data);
            toast.success('Create product success')
            navigate('/productManage'); 
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };
    return (
        <form
        onSubmit={handleAddProduct}
        encType="multipart/form-data"
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="files">
                Upload Files
            </label>
            <input
                type="file"
                name="files"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full  text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">
                Product Name
            </label>
            <input
                type="text"
                name="productName"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                Category
            </label>
            <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                Price
            </label>
            <input
                type="text"
                name="price"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="des">
                Description
            </label>
            <textarea
                type="text"
                name="Des"
                placeholder="Description"
                onChange={(e) => setDes(e.target.value)}
                value={des}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            Create
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
    </form>
    
    
    );
};

export default AddProductForm;
