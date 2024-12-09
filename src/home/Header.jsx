import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from 'axios';
import axiosInstance from '../jwt/refreshAccessToken';
const Header = () => {
  const authStore = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { user } = useUser();
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/')
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTargetValue = (value) => {
    if (value === '') {
      return navigate('/')
    }
    navigate(`/category/${value}`)
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 2000)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      fetchProducts(debouncedTerm)
    }
  }, [debouncedTerm]);
  const fetchProducts = async (term) => {
    try {
      const response = await axiosInstance.post(`/users/productSearch/${term}`)
      if (response.status !== 200) throw new Error('Error')
      setProducts(response.data)
      setIsDropdownVisible(true);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const clickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);
  return (
    <>
      <div className='flex pt-5 pb-5 sticky bg-slate-200 top-0 z-10 scroll-smooth'>
        <div className=' font-black text-2xl ml-40'>
          <Link to='/'><h1 onClick={scrollToTop}>Exclusive</h1></Link>
        </div>
        <div className='w-3/4 ml-20 pt-2 '>
          <ul className="list-none flex justify-between cursor-pointer w-4/5">
            <Link to="/" onClick={scrollToTop} className="hover:underline">
              Home
            </Link>
            <select
              onChange={(e) => handleTargetValue(e.target.value)}
              className='bg-gray-200 outline-0 rounded-md'>
              <option className='bg-white' value="">Category</option>
              <option className='bg-white' value="Ipad">Ipad</option>
              <option className='bg-white' value="Laptop">Laptop</option>
              <option className='bg-white' value="Phone">Phone</option>
            </select>
            {/* <li className="hover:underline">Category</li> */}
            <li className="hover:underline">Contact</li>
            <li className="hover:underline">About</li>

            {authStore.isAuth && authStore.user ? (
              <div className="relative flex items-center space-x-4">

                <button
                  onClick={toggleMenu}
                  className="text-blue-500 font-medium hover:underline"
                >
                  {authStore.user ? authStore.user.name : null}
                </button>

                {menuOpen && (
                  <div ref={menuRef} className="absolute top-full mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          Profile Manage
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/viewCart"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          View Cart
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/viewOrder"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          View Order
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {authStore.user?.shopId ? (
                  authStore.user.shopId.isActive ? (
                    <Link to="/shop" className="text-orange-500 hover:underline">
                      Go to Shop
                    </Link>
                  ) : (
                    <p className="text-gray-500 cursor-not-allowed">Shop đang chờ duyệt</p>
                  )
                ) : (
                  <Link to="/ShopRegister" className="text-blue-500 hover:underline">
                    Shop Register
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
                <Link to="/login" className="hover:underline">
                  Log in
                </Link>
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownVisible(true)}
                className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-1 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {isDropdownVisible && products.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white border border-slate-300 rounded-md shadow-md mt-1 w-full max-h-80 overflow-y-scroll"
                >
                  <table className="table-auto w-full text-left">
                    <tbody>
                      {products.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td>
                            {item.image &&
                              Array.isArray(item.image) &&
                              item.image.map((image, i) => (
                                <img
                                  key={i}
                                  className="w-28"
                                  src={image}
                                  alt={`Product ${i}`}
                                />
                              ))}
                          </td>
                          <td className="text-xs px-1 py-1">{item.productName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Header