import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../jwt/refreshAccessToken';
const ListProduct = React.memo(({ items }) => {
  const authStore = useSelector(state => state.auth);
  const { productName, imageDetail, category, price, image, _id } = items
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleImg, setIsFormVisibleImg] = useState(true);
  const [imgId, setImgId] = useState(null);
  const [files, setFiles] = useState(null);
  // const [file, setFile] = useState(null);
  const [idProduct, setIdProduct] = useState({});
  const [name, setName] = useState(productName);
  const [priceProduct, setPriceProduct] = useState(price);
  const [categoryProduct, setCategoryProduct] = useState(category);
  // console.log(files)
  const handleEdit = (event) => {
    event.preventDefault();
    setIsFormVisible(!isFormVisible)
    setIdProduct(_id)
  }
  const handleClose = () => {
    setIsFormVisible(false);
  };
  const deleteImage = () => {
    setIsFormVisibleImg(!isFormVisibleImg);
    setImgId(image)
  }

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', name);
    formData.append('category', categoryProduct);
    formData.append('price', priceProduct);
    formData.append('imageUrlsToDelete', JSON.stringify(imgId));
    const url = new URL('http://localhost:8080/shop/shop/updateProduct');
    url.searchParams.append('id', _id);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const response = await axios.post(url.toString(),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${authStore.accessToken}`
          }
        }
      )
      if (!response.ok) {
        const errorData = await response.message;
        console.error('Error details:', errorData);
        throw new Error('Failed to add product');
      }

      const data = await response.data;
      toast.success('Update success');
      // console.log('Product added successfully:', data);
      navigate('/productManage'); 
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axiosInstance.post('shop/shop/deleteProduct',{productId:productId})
      if(response.status !== 200) throw new Error('Error')
        toast.success('Delete success')
    } catch (error) {
      console.error('Error delete product:', error);
    }
  }
  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-2xl text-center space-y-3 ">
        {/* Hình ảnh */}
        {image ? (
          <img className=" object-cover rounded-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 " src={image} alt="error" />
        ) : (
          <div className=" bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <p className="text-sm font-medium text-gray-800 "> {productName}</p>
        <p className="text-sm p-0 text-gray-600">Price: ${price}</p>
        <div className="flex justify-between w-full space-x-2">
          <button
            onClick={handleEdit}
            className="w-1/2 h-8 border rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Edit
          </button>
          <button
          onClick={()=>handleDeleteProduct(_id)}
            className="w-1/2 h-8 border rounded-md shadow-sm bg-red-500 text-white hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          ></div>

          <div className="relative max-h-screen overflow-y-auto bg-white w-1/2 p-6 rounded-lg shadow-lg z-60">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form encType="multipart/form-data" onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700"> Price</label>
                <input
                  type="number"
                  value={priceProduct}
                  onChange={e => setPriceProduct(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  value={categoryProduct}
                  onChange={e => setCategoryProduct(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-6">
                {/* Cập nhật ảnh chính */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  {!imgId ? <div className="flex items-center w-1/4 gap-4 relative group">
                    <img
                      src={image}
                      alt="Main"
                      className="w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                      onClick={deleteImage}
                      className="absolute top-2 left-28 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                    : null
                  }
                  <input
                    type="file"
                    name='file'
                    // accept="image/*"
                    // onChange={(e) => setFile(e.target.files)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm text-gray-500"
                  />
                </div>

                {/* Cập nhật hoặc thêm nhiều ảnh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image Detail</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imageDetail.map((img, index) => (
                      <div key={index} className="relative w-4/5 group">
                        <img
                          src={img}
                          alt={`Detail ${index}`}
                          className="w-full h-40 border border-gray-300 rounded-md shadow-sm"
                        />
                        <button
                          // onClick={() => handleDeleteImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <input
                      type="file"
                      name='files'
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
})

export default ListProduct