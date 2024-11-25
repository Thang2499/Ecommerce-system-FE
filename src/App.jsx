import '../src/App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './LoginSignup/login'
import Header from './home/header';
import SignUp from './LoginSignup/SignUp';
import Body from './home/Body';
import ErrorPage from './home/ErrorPage';
import { UserProvider } from './context/UserContext';
import ShopManage from './shop/shopManage';
import ProductManage from './shop/productManage';
import AddProductForm from './componentChild/Shop/AddProductForm';
function App() {

  return (
    <>
      <UserProvider>
        <div >
          <Header />
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<ShopManage />}></Route>
            <Route path='/productManage' element={<ProductManage />}>
              <Route path='addProduct' element={<AddProductForm />} />
            </Route>
            {/* <Route path='/admin' element={<Admin/>}/>
        
            <Route path='/profile' element={<Profile />}>
              <Route path='EditUser' element={<EditUser />}></Route>
              <Route path='OrderUser' element={<OrderUser />}></Route>
            </Route>

            <Route path='/wishlist' element={<WishListPage />} />
            <Route path='/productDetail/:id' element={<ProductDetail />} />

            <Route path='/card' element={<CardProduct />} />
            <Route path='/checkout' element={<Checkout />} /> */}
            <Route path='/:rest' element={<ErrorPage />} />
            <Route path='/' element={<Body />} exact></Route>
          </Routes>
        </div>
      </UserProvider>
    </>

  )

}

export default App
