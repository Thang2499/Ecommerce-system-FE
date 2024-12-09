import React, { useState, useEffect } from 'react';
import axios from 'axios';



const DetailView = ({ detail, type, onClose,  }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrderHistory = async (id, type, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Vui lòng đăng nhập lại");
        return;
      }

      let url = "";
      if (type === "user") {
        url = `http://localhost:8080/admin/order/user/${id}?status=${status || ''}`;
      } else if (type === "shop") {
        url = `http://localhost:8080/admin/order/shop/${id}?status=${status || ''}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Dữ liệu trả về:', response.data);
      if (orderHistory.length === 0) {
        console.log("Không có đơn hàng.");
      }

      if (response.data) {
        setOrderHistory(response.data);
        console.log('Lịch sử đơn hàng:', orderHistory);

      } else {
        alert("Không tìm thấy lịch sử đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng", error);
      alert("Không thể lấy lịch sử đơn hàng, vui lòng thử lại");
    }
  };
  

  useEffect(() => {
    if (detail && type) {
      fetchOrderHistory(detail._id, type);
    }
  }, [detail, type]);

  if (!detail) return null; 


  return (
    <div className="detail-view bg-white shadow-lg p-4 rounded fixed top-1/4 left-1/4 w-1/2 z-50">
      <h2 className="text-lg font-semibold mb-4">
        Chi tiết {type === 'user' ? 'Người dùng' : 'Shop'}
      </h2>

      {type === 'user' && (
        <div>
          <p><strong>Tên:</strong> {detail.name}</p>
          <p><strong>Email:</strong> {detail.email}</p>
          <p><strong>Số điện thoại:</strong> {detail.phone}</p>
          <p><strong>Địa chỉ:</strong> {detail.address || 'Chưa cập nhật'}</p>

          <h3 className="mt-4 mb-2 font-medium">Lịch sử mua hàng:</h3>
          {orderHistory && orderHistory.length > 0 ? (
            <ul>
              {orderHistory && orderHistory.map((order) => (
                <li key={order._id} className="border-b py-2">
                  <p><strong>Ngày:</strong> {new Date(order.date).toLocaleString()}</p>
                   <p><strong>Món hàng:</strong> {order.items.map(item =>
                   <div>
                    <p>{ item.itemId.productId.productName}</p>
                    { item.itemId.productId.image.map(image => <img className='w-36' src={image}/>)}
                    <p>Shop:{item.itemId.productId.shopId.name}</p>
                   </div>
                   )
                   }</p>  
                 
                  <p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString()} </p>

                </li>
              ))}
            </ul>
          ) : (
            <p>Người dùng chưa có lịch sử mua hàng.</p>
          )}
        </div>
      )}

      {/* Thông tin chi tiết của Shop */}
      {type === 'shop' && (
        <div>
          <p><strong>Tên Shop:</strong> {detail.name}</p>
          <p><strong>Số điện thoại:</strong> {detail.phone}</p>
          <p><strong>Địa chỉ:</strong> {detail.address || 'Đang cập nhật'}</p>

          {/* Lịch sử bán hàng */}
          <h3 className="mt-4 mb-2 font-medium">Lịch sử bán hàng:</h3>
          {orderHistory.length > 0 ? (
            <ul>
              {orderHistory.map((order) => (
                <li key={order._id} className="border-b py-2">
                  <p><strong>Ngày:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Người mua:</strong> {order.buyerName}</p>
                  <p><strong>Món hàng:</strong> {order.items.map(item => item.name).join(', ')}</p>
                  <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()} VND</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Shop chưa có lịch sử bán hàng.</p>
          )}
        </div>
      )}

      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
      >
        Đóng
      </button>
    </div>
  );
};
  
  export default DetailView;