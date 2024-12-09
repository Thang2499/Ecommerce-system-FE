import React, {useEffect, useState} from 'react'
import { getOrdersByShop } from './adminAPI'

const orderShop = ({shopId}) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getOrdersByShop(shopId);
            setOrders(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchOrders();
      }, [shopId]);
  return (
    <div>
    <h2>Danh Sách Đơn Hàng Của Shop</h2>
    <ul>
      {orders.map((order) => (
        <li key={order._id}>
          Tổng tiền: {order.totalAmount}, Trạng thái: {order.status}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default orderShop
