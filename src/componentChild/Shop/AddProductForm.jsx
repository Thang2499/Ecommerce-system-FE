import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState(null); 

    const handleAddProduct = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('category', category);
        formData.append('price', price);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]); 
            }
        }

        try {
            const response = await fetch('http://localhost:8080/shop/shop/addProduct', {
                method: 'POST',
                credentials: 'include',
                body: formData, 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to add product');
            }

            const data = await response.json();
            console.log('Product added successfully:', data);
            navigate('/productManage'); 
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    return (
        <form onSubmit={handleAddProduct} encType="multipart/form-data">
            <input
                type="file"
                name="files"
                multiple
                onChange={(e) => setFiles(e.target.files)}
            />
            <input
                type="text"
                name="productName"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            />
            <input
                type="text"
                name="price"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default AddProductForm;
