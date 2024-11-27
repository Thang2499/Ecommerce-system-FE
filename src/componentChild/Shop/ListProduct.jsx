import React, { useState } from 'react'

const ListProduct = React.memo(({ items }) => {
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
    // console.log(file)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    // if (file) {
    //   formData.append('file', file);
    // }
    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log('Product added successfully:', data);
      // navigate('/productManage'); 
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };
  return (
    <div>
      <div>
        {image ? <img className='w-32' src={image} alt="error" /> : ''}
        <p className='w-32 text-sm'>ProductName: {productName}</p>
        <p>Price: {price}</p>
        <div className='flex justify-between w-32 '>
          <button onClick={handleEdit} className=' h-6 text-center w-16 border rounded-md  shadow-sm bg-blue-500 hover:bg-blue-600 hover:text-white'>Edit</button>
          <button className=' h-6 text-center w-16 border rounded-md  shadow-sm bg-red-500 hover:bg-red-600 hover:text-white'>Delete</button>
        </div>
        {/* {imageDetail.map(images => <img style={{width:'100px', height:'100px'}} src={images}/>)} */}
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
                 {!imgId ?  <div className="flex items-center w-1/4 gap-4 relative group">
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
                :null  
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
                      <div key={index} className="relative group">
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
    </div>
  )
})

export default ListProduct