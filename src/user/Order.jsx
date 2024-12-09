import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../jwt/refreshAccessToken';
const Order = () => {
  const authStore = useSelector(state => state.auth);
  const [order, setOrder] = useState([]);
 
  const [formData, setFormData] = useState({
    firstName: authStore.user ? authStore.user.name : '',
    streetAddress: '',
    phoneNumber: '',
    email: authStore.user ? authStore.user.email : ''
  });

  const [errors, setErrors] = useState({});
  const [fee, setFee] = useState(null);
  const [error, setError] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');
  const address = [formData.streetAddress, selectedWardName, selectedDistrictName, selectedProvinceName].toString();

  const [selectedPayment, setSelectedPayment] = useState('');
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const total = order.map(item => item.totalPrice);
  const totalPrice = total.reduce((acc, curr) => acc + curr, 0);
 const totalPriceOrder = parseFloat(fee) +parseFloat(totalPrice);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewCart = async () => {
    try {
      const res = await axiosInstance.get('/users/viewCart',
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     authorization: `Bearer ${authStore.accessToken}`
        //   },
        // }
      )
      setOrder(res.data.itemsInCart)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleViewCart();
  }, [])

  const handlePayment = async () => {
    try {
      const response = await axios.get('https://api.exchangeratesapi.io/v1/latest', {
        params: {
          access_key: 'b101057879ccbb800065501cf7af551f',
          symbols: 'USD,VND',
        },
      });

      const exchangeRate = response.data.rates.VND;
      const convertedAmount = totalPriceOrder * exchangeRate;
      const amountPayment = Math.floor(convertedAmount);
      const responsePayment = await axiosInstance.post('/shop/shop/payment', { amountPayment: amountPayment },
        // {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        // }
      );

      if (responsePayment.data && responsePayment.data.payUrl) {
        window.location.href = responsePayment.data.payUrl;
      } else {
        toast.error('Error initiating payment');
      }
    } catch (error) {
      console.error('Error occurred: ', error);
      toast.error('Payment failed');
    }
  };

 
  //-------------------------------------------------

  useEffect(() => {
    axiosInstance.get('/shop/shop/provinces')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict('');
    setWards([]);
    const selectedProvince = provinces.find(
      (province) => province.ProvinceID === Number(provinceId)
    );
    setSelectedProvinceName(selectedProvince ? selectedProvince.ProvinceName : '');
    axiosInstance.get(`/shop/shop/districts/${provinceId}`)
      .then((response) => setDistricts(response.data))
      .catch((error) => console.error(error));

  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard('');
    const selectedDistrict = districts.find(
      (district) => district.DistrictID === Number(districtId)
    );
    setSelectedDistrictName(selectedDistrict ? selectedDistrict.DistrictName : '');
    axiosInstance.get(`/shop/shop/wards/${districtId}`)
      .then((response) => setWards(response.data))
      .catch((error) => console.error(error));
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    const selectedWards = wards.find(
      (ward) => ward.WardCode === selectedWard
    );
    console.log('cehck',selectedWards)
    setSelectedWardName(selectedWards ? selectedWards.WardName : '');
  };
 
  // const handleSubmits = (e) => {
  //   e.preventDefault();
  //   console.log('Địa chỉ:', {
  //     address,
  //   });
  // };
  
    const calculateShippingFee = async (data) => {
      try {
        const response = await axiosInstance.post(`/shop/shop/shippingFee`, data);
        return response;
      } catch (error) {
        console.error('Error calculating shipping fee:', error.response.data);
        alert(error.response.data)
        throw error;
      }
    };
  
  const handleCalculate = async () => {
    const data = {
      to_district_id: selectedDistrict,
      to_ward_code: selectedWard,
      service_id: 53321,
    };
    try {
      const result = await calculateShippingFee(data);

      const response = await axios.get('https://api.exchangeratesapi.io/v1/latest', {
        params: {
          access_key: 'b101057879ccbb800065501cf7af551f',
          symbols: 'USD,VND',
        },
      });

      const exchangeRate = response.data.rates.VND;
      const totalFeeVND = result.data.data.total; 
  
      const convertedAmount = totalFeeVND / exchangeRate;
      const amountPayment = (convertedAmount).toFixed(2); 
  
      setFee(amountPayment);
    } catch (err) {
      setError('Không thể tính cước vận chuyển');
    }
  }
  useEffect(() => {
    if (selectedDistrict && selectedWard) {
      handleCalculate();
    }
  }, [selectedDistrict, selectedWard]);
  //-------------------------------------------------
  // const createOrder = async () => {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/users/createOrder`,{address,selectedPayment},
  //       {
  //       headers: {
  //         // 'Content-Type': 'application/json',
  //         authorization: `Bearer ${authStore.accessToken}`
  //       },
  //   });
  //     // if(!response.ok) throw new Error ('error');
  //     console.log(response)
  //     // return response;
  //   } catch (error) {
  //     console.error('Error create Order:', error);
  //     throw error;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First Name is required';
    if (!formData.streetAddress) formErrors.streetAddress = 'Street Address is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email) formErrors.email = 'Email Address is required';

    if (order.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
      return;
    }
    if (Object.keys(formErrors).length === 0) {
      setFormData({
        firstName: '',
        streetAddress: '',
        phoneNumber: '',
        email: ''
      });
    } else {
      setErrors(formErrors);
    }
    if(!selectedPayment){
      toast.error('Vui lòng chọn phương thức thanh toán')
      return;
    }
    //-------------------------------------------
    try {
      const response = await axiosInstance.post(`/users/createOrder`,{
        address:address,
        selectedPayment:selectedPayment,
        fee:fee
      },
  );

    if (response.status !== 200) throw new Error('Error in creating order');
    } catch (error) {
      console.error('Error create Order:', error);
      throw error;
    }
    //---------------------------------------------
    if(selectedPayment === 'Momo'){
      await handlePayment();
       return;
     }
     if(selectedPayment === 'Cash on Delivery'){
      toast.success('Thanks for your order')
       return;
     }
  };
  return (
    <>
      <div className='flex justify-between ml-32 mt-8 mb-12 scroll-smooth'>
        <div>
          <h1 className='text-3xl'>Billing Details</h1>
          <form onSubmit={handleSubmit} className="space-y-3  bg-white  rounded-lg  w-96">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Tỉnh/Thành phố */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố:</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="block w-full h-10 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.ProvinceID} value={province.ProvinceID}>
                    {province.ProvinceName}
                  </option>
                ))}
              </select>
            </div>

            {/* Quận/Huyện */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện:</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                className={`block w-full h-10 px-3 border ${!selectedProvince ? 'bg-gray-100' : 'bg-white'
                  } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.DistrictID} value={district.DistrictID}>
                    {district.DistrictName}
                  </option>
                ))}
              </select>
            </div>

            {/* Phường/Xã */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã:</label>
              <select
                value={selectedWard}
                onChange={handleWardChange}
                disabled={!selectedDistrict}
                className={`block w-full h-10 px-3 border ${!selectedDistrict ? 'bg-gray-100' : 'bg-white'
                  } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.WardCode} value={ward.WardCode}>
                    {ward.WardName}
                  </option>
                ))}
              </select>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
              {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full h-10 px-3 bg-slate-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                className="bg-red-600 text-white w-40 h-11 mt-4 rounded hover:bg-red-700 transition duration-200"
                type="submit"
              >
                Place Order
              </button>
            </div>
          </form>
          {/* {paymentSuccess && <p className='text-green-500 mt-4'>Payment successful! Thank you for your order.</p>} */}
        </div>
        <div className='ml-32 mr-28 mt-12 w-1/2'>
          {order.length > 0 ? (
            order.map((item) => (
              <div key={item._id} className='flex h-20 p-4'>
                {item.productId.image.map((image, index) => <img key={index} src={image} className='w-16' />)}
                <h2 className='text-sm mt-3 ml-4 w-44'>{item.productId.productName}</h2>
                <div className='ml-32'>
                  <p className='text-center text-lg pt-1 w-8'> x{item.quantity}</p>
                </div>
                <p className='pt-2 ml-8'>${(item.unitPrice)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className='w-4/5 p-5'>
            <div className='flex justify-between mt-4'>
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <hr className='mt-1 mb-2' />
            <div className='flex justify-between'>
              <p>Shipping</p>
              <p>${fee}</p>
              {/* <button onClick={handleSubmits}>Fee</button> */}
              {/* <p>Free</p> */}
            </div>
            <hr className='mt-1 mb-2' />
            <div className='flex justify-between mb-2'>
              <p>Total</p>
              <p>${totalPriceOrder ? totalPriceOrder : totalPrice }</p>
            </div>
          </div>
          <div>
            <div className='flex mb-8 ml-6'>
              <span>Phương thức thanh toán: </span>
              {/* <img onClick={handlePayment}  className='w-8 ' src={momo} alt="" /> */}
             <div className="flex items-center space-x-2 ml-3">
        <input
          type="radio"
          id="momo"
          name="payment"
          value="Momo"
          checked={selectedPayment === 'Momo'}
          onChange={handlePaymentChange}
          className="cursor-pointer"
        />
        <label htmlFor="momo" className="cursor-pointer">
          Momo
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="cash"
          name="payment"
          value="Cash on Delivery"
          checked={selectedPayment === 'Cash on Delivery'}
          onChange={handlePaymentChange}
          className="cursor-pointer"
        />
        <label htmlFor="cash" className="cursor-pointer">
          Cash on Delivery
        </label>
      </div>
            </div>

          </div>
          <div className='ml-4'>
            <input className='border-2 py-2 px-4 rounded' placeholder='Coupon Code' type="text" />
            <button className='bg-red-600 text-white w-40 h-11 ml-3 rounded'>Apply Coupon</button>
          </div>
        </div>
        {/* <ToastContainer /> */}
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
    </>
  )
}

export default Order