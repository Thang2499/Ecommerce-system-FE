import React, { useState } from 'react';

const ManageOrderChild = ({ items }) => {
  const [activeTab, setActiveTab] = useState('pending'); 

  const filteredOrders = items.filter((item) => {
    if (activeTab === 'pending') return item.status === 'pending'; 
    if (activeTab === 'delivering') return item.status === 'delivering';
    if (activeTab === 'completed') return item.status === 'completed'; 
    return true;
  });
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === 'pending'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Đang chờ xác nhận
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'delivering'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('delivering')}
        >
          Đang giao
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'completed'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Đã hoàn thành
        </button>
      </div>

      {/* Nội dung đơn hàng */}
      <div>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((item) => (
            <div
              key={item.id}
              className="p-4 mb-4 bg-white shadow rounded-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-sm text-gray-500">Giá: {item.price} VND</p>
              </div>
              <span
                className={`py-1 px-3 rounded-full text-sm ${
                  activeTab === 'pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : activeTab === 'delivering'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {item.status === 'pending'
                  ? 'Chờ xác nhận'
                  : item.status === 'delivering'
                  ? 'Đang giao'
                  : 'Hoàn thành'}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default ManageOrderChild;
