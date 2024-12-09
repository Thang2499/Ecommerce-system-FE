import '../src/App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './LoginSignup/login'
import Header from './home/header';
import SignUp from './LoginSignup/SignUp';
import Body from './home/Body';
import ErrorPage from './home/ErrorPage';
import { UserProvider } from './context/UserContext';
import ShopManage from './shop/ShopManage';
import AddProductForm from './componentChild/Shop/AddProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './store/authSlice';
import ViewCart from './user/ViewCart';
import Order from './user/Order';
import ShopRegister from './shop/ShopRegister';
import ProductManage from './shop/ProductManage';
import Profile from './user/profile';
import ManageOrder from './shop/ManageOrder';
import { ShopProfile } from './shop/ShopProfile';
import ViewOrder from './user/ViewOrder';
import ProductDetail from './shop/ProductDetail';
import ProductByCategory from './componentChild/Shop/ProductByCategory';
function App() {
  const authStore = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !accessToken || !refreshToken) {
        dispatch(logout())
      }
      dispatch(login({
        accessToken, refreshToken, user
      }))
    } catch (error) {
      dispatch(logout())
    }
  }, [])

  if (authStore.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <UserProvider>
        <div >
          <Header />
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/ViewCart' element={<ViewCart />} />
            <Route path='/Order' element={<Order />} />
            <Route path='/ShopRegister' element={<ShopRegister />} />
            <Route path='/viewOrder' element={<ViewOrder />} />
            <Route path='/productDetail/:id' element={<ProductDetail />} />
            <Route path='/category/:name' element={<ProductByCategory />} />


            <Route path='/shop' element={<ShopManage />}>
              <Route path='ManageOrder' element={<ManageOrder />} />
              <Route path='ManageProfile' element={<ShopProfile />} />
              <Route path='productManage' element={<ProductManage />}>
                {/* <Route path='addProduct' element={<AddProductForm />} /> */}
              </Route>
            </Route>

            <Route path='/productManage' element={<ProductManage />}>
              <Route path='addProduct' element={<AddProductForm />} />
            </Route>
            <Route path='/:rest' element={<ErrorPage />} />
            <Route path='/' element={<Body />} exact></Route>
          </Routes>
        </div>
      </UserProvider>
    </>
  )
}

export default App
