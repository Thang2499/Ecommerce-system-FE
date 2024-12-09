import React, {useState} from 'react'
import { createOrder } from './adminAPI'

const createOrder = () => {
    const [orderData, setOrderData] = useState({
        userId: "",
        shopId: "",
        totalAmount: "",
        paymentMethod: "",
      });
      const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await createOrder(orderData);
          alert("Đơn hàng được tạo thành công!");
        } catch (error) {
          alert("Có lỗi xảy ra khi tạo đơn hàng!");
        }
      };
  return (
    <div>
    <h2>Tạo Đơn Hàng</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={orderData.userId}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="shopId"
        placeholder="Shop ID"
        value={orderData.shopId}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="totalAmount"
        placeholder="Tổng Tiền"
        value={orderData.totalAmount}
        onChange={handleChange}
        required
      />
      <select
        name="paymentMethod"
        value={orderData.paymentMethod}
        onChange={handleChange}
        required
      >
        <option value="">Chọn Phương Thức Thanh Toán</option>
        <option value="Momo">Momo</option>
        <option value="Cash on Delivery">COD</option>
        <option value="Paypal">Paypal</option>
      </select>
      <button type="submit">Tạo</button>
    </form>
  </div>
  )
}

export default createOrder
