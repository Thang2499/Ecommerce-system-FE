import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailView from './Detail';


  const AdminHome = () => {
      const [users, setUsers] = useState([]);
      const [shops, setShops] = useState([]);
      const [loading, setLoading] = useState(true);
      const [pendingShops, setpendingShops] = useState([]);
      const [activeTab, setactiveTab] = useState("users"); 
      const [editingUser, setEditingUser] = useState(null)
      const [editingShop, setEditingShop] = useState(null);
      const [selectedDetail, setSelectedDetail] = useState(null);
      const [detailType, setDetailType] = useState("")
      const [selectedUserId, setSelectedUserId] = useState(null);
      const [userOrders, setUserOrders] = useState([]);



      useEffect(() => {

 

      
        // const fetchDetail = async (type, id) => {
        //   try {
        //     const token = localStorage.getItem("accessToken");
        //     if (!token) {
        //       alert("Vui lòng đăng nhập lại");
        //       return;
        //     }
      
        //     const endpoint = type === "user" ? `/user/${id}` : `/shop/${id}`;
        //     const res = await axios.get(`http://localhost:8080/admin${endpoint}`, {
        //       headers: { Authorization: `Bearer ${token}` },
        //     });
      
        //     setSelectedDetail(res.data.data); 
        //     setDetailType(type);
        //   } catch (error) {
        //     console.error("Lỗi khi lấy chi tiết:", error);
        //   }
        // };
        


          const fetchData = async () => {
            try {
              const token = localStorage.getItem("accessToken");
              if (!token) {
                alert("Vui lòng đăng nhập lại");
                return;
              }
        
              const [usersResponse, shopsResponse, pendingShopsResponse] = await Promise.all([
                axios.get("http://localhost:8080/admin/users", {
                  headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8080/admin/shops", {
                  headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8080/admin/pending", {
                  headers: { Authorization: `Bearer ${token}` },
                }),
              ]);
        
              console.log("Users:", usersResponse.data.getUsers);
              console.log("Shops:", shopsResponse.data.getShops);
              console.log("Pending Shops:", pendingShopsResponse.data.data);
              console.log("Pending Shops data:", pendingShops);

        
              setUsers(usersResponse.data.getUsers || []);
              setShops(shopsResponse.data.getShops || []);
              setpendingShops(pendingShopsResponse.data.data || []);
            } catch (err) {
              console.error("Lỗi khi lấy dữ liệu:", err);
            } finally {
              setLoading(false);
            }
          };
        
          fetchData();
        }, [] );
        const fetchDetail = async (type, id) => {
          try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
              alert("Vui lòng đăng nhập lại");
              return;
            }
      
            const endpoint = type === "user" ? `/user/${id}` : `/shop/${id}`;
            const res = await axios.get(`http://localhost:8080/admin${endpoint}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
      console.log('checkkkkk',res)
            setSelectedDetail(res.data.data); 
            setDetailType(type);
          } catch (error) {
            console.error("Lỗi khi lấy chi tiết:", error);
          }
        };
        
    
        const approveShop = async (id) => {
          try {
          
            const token = localStorage.getItem("accessToken");
            if (!token) {
              alert("Vui lòng đăng nhập lại");
              return;
            }
        
          
            const response = await axios.put(
              `http://localhost:8080/admin/approve/${id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
        
        
            if (response.status === 200) {
              alert(response.data.message);
        
              setpendingShops((prev) => prev.filter((shop) => shop._id !== id));
              setShops((prev) => [...prev, response.data.shop]);
            } else {
              alert("Phê duyệt không thành công. Vui lòng thử lại.");
            }
          } catch (err) {
          
            console.error("API Error:", err.response ? err.response.data : err.message);
            alert("Lỗi khi phê duyệt shop. Vui lòng thử lại.");
          }
        };
        
        if (loading) return <p>Đang tải dữ liệu...</p>;

        const handleEdit = (user) => {
          setEditingUser(user);
        };

        const  handleUpdateUser = async () => {
          try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
              alert("vui long  dang nhap lai"); 
              return;
            }
            const response = await axios.put (
              `http://localhost:8080/admin/user/${editingUser._id}`,
              editingUser,
              {
                headers: {Authorization: `Bearer ${token}`},
              }
            );
            alert(response.data.message);
            setUsers((prev) =>
              prev.map((user) => (user._id === editingUser._id ? editingUser : user))
          );
          setEditingUser(null); 
          } catch (error) {
            console.error("Loi khi sua nguoi dung", error);
            alert("Khong the cap nhap, vui long thu lai");
          }
        };

        const handleDeleteUser = async (id) => {
          try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
              alert("Vui long dang nhap lai");
              return;
            }
            const response = await axios.delete(`http://locahost:8080/admin/user/${id}`,
          {   headers: { Authorization: `Bearer ${token}`},
          });
          alert(response.data.message);
          setUsers((prev) =>prev.filter((user) => user._id !== id));
          } catch (error) {
            console.error("Loi khi xoa nguoi dung". error);
            alert("Khong the xoa nguoi dung, vui long thu lai");
          }
        };

        const handleEditShop = (shop) => {
          setEditingShop(shop); 
      };


      const handleUpdateShop = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("Vui long dang nhap lai");
                return;
            }
    
            const response = await axios.put(
                `http://localhost:8080/admin/shop/${editingShop._id}`,
                editingShop,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            alert(response.data.message);
    
            setShops((prev) =>
                prev.map((shop) =>
                    shop._id === editingShop._id ? editingShop : shop
                )
            );
    
            setEditingShop(null);
        } catch (error) {
            console.error("Loi khi sua shop", error);
            alert("Khong the cap nhap shop, vui long thu lai sau");
        }
    };

    const handleDeleteShop = async (id) => {
      try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
              alert("Vui long dang nhap lai");
              return;
          }

          const response = await axios.delete(`http://localhost:8080/admin/shop/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
          });

          alert(response.data.message);

          setShops((prev) => prev.filter((shop) => shop._id !== id));
      } catch (error) {
          console.error("Loi khi xoa shop", error);
          alert("Khong the xoa shop, vui long thu lai sau");
      }
  };

  const fetchActiveStatus = async (type, id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const endpoint = type === "user" ? `/user/active/${id}` : `/shop/active/${id}`;
      await axios.patch(`http://localhost:8080/admin${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };
    
      return (
        <div className="min-h-screen bg-gray-50 p-6">
    <h1 className="text-2xl font-bold text-center mb-6">Trang Quản Trị</h1>
    <nav className="flex justify-center space-x-4 mb-6">
      

      <button
        onClick={() => setactiveTab("users")}
        className={`px-4 py-2 rounded ${
          activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Danh Sách Người Dùng
      </button>
      <button
        onClick={() => setactiveTab("shops")}
        className={`px-4 py-2 rounded ${
          activeTab === "shops" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Danh Sách Shop
      </button>
      <button
        onClick={() => setactiveTab("pendingShops")}
        className={`px-4 py-2 rounded ${
          activeTab === "pendingShops" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Shop Chờ Phê Duyệt
      </button>
    </nav>

    {activeTab === "users" && (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Danh Sách Người Dùng</h2>
        <ul className="space-y-2">
          {users?.length > 0 ? (
            users.map((user) => (
              <li key={user._id}
                className="p-2 border rounded flex justify-between items-center"
              >
                <span>{user.name} - {user.email} {" "}
                <span
                      className={`ml-2 px-2 py-1 rounded ${
                        user.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.isActive ? "Đang hoạt động" : "Không hoạt động"}
                    </span>

                </span>
                <button
                    onClick={() => fetchActiveStatus("user", user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Đánh dấu hoạt động
                  </button>
                <div>
  
                <button
                      onClick={() => fetchDetail("user", user._id)} 
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Xem Chi Tiết
                    </button>

                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Chưa có người dùng</p>
          )}
        </ul>
      </div>
    )}

    {activeTab === "shops" && (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Danh Sách Shop</h2>
        <ul className="space-y-2">
          {shops?.length > 0 ? (
            shops.map((shop) => (
              <li
                key={shop._id}
                className="p-2 border rounded flex justify-between items-center"
              >
                <span>{shop.name} - {shop.phone}  {""}
                <span
                      className={`ml-2 px-2 py-1 rounded ${
                        shop.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {shop.isActive ? "Đang hoạt động" : "Không hoạt động"}
                    </span>

             

                </span>
                <div>
                <button
                      onClick={() => fetchDetail("shop", shop._id)} 
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Xem Chi Tiết
                    </button>
 
                  <button
                    onClick={() => handleEditShop(shop)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteShop(shop._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Chưa có shop</p>
          )}
        </ul>
      </div>
    )}

    {activeTab === "pendingShops" && (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Shop Chờ Phê Duyệt</h2>
        <ul className="space-y-2">
          {pendingShops?.length > 0 ? (
            pendingShops.map((shop) => (
              <li
                key={shop._id}
                className="p-2 border rounded flex justify-between items-center"
              >
                <span>{shop.name} - {shop.phone}</span>
                <button
                  onClick={() => approveShop(shop._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Phê Duyệt
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Không có shop chờ phê duyệt</p>
          )}
        </ul>
      </div>
    )}

    {/* Form Sửa Người Dùng */}
    {editingUser && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Sửa Người Dùng</h2>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            className="border p-2 w-full rounded mb-4"
          />
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Lưu
          </button>
          <button
            onClick={() => setEditingUser(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    )}

    {/* Form Sửa Shop */}
    {editingShop && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Sửa Shop</h2>
          <input
            type="text"
            value={editingShop.name}
            onChange={(e) =>
              setEditingShop({ ...editingShop, name: e.target.value })
            }
            className="border p-2 w-full rounded mb-4"
          />
          <button
            onClick={handleUpdateShop}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Lưu
          </button>
          <button
            onClick={() => setEditingShop(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    )};

{selectedDetail && (
        <DetailView
          detail={selectedDetail}
          type={detailType}
          onClose={() => setSelectedDetail(null)} // Đóng chi tiết
        />
      )}



      


  </div>
      );
    };

export default AdminHome
