import React, {useEffect,useState} from 'react'
import { getOrdersByUser } from './adminAPI'


const orderUser = ({userId}) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getOrdersByUser(userId);
            setOrders(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchOrders();
      }, [userId]);

  return (
    <div>
      <h2>Lịch Sử Mua Hàng Của Người Dùng</h2>
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

export default orderUser
