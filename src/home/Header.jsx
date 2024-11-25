import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user } = useUser();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Sử dụng 'smooth' để tạo hiệu ứng cuộn mượt
    });
  };
  return (
    <>
      <div className='flex justify-around pt-5 pb-5 sticky top-0 bg-black text-zinc-400 z-10 scroll-smooth'>
        <div className=' font-black text-2xl'>
          <Link to='/'><h1>Exclusive</h1></Link>
        </div>
        <div className='w-1/5 pt-2 '>
          <ul className='list-none flex justify-between cursor-pointer'>
            <Link to='/' onClick={scrollToTop} className='li-hover'>Home</Link>
            <li className='li-hover'>Contact</li>
            <li className='li-hover'>About</li>
            {user ? <div className='flex justify-between ml-3'>
              <p className=''>hello {user.name}</p>
              {user.shopId ?
                (<Link to='/shop'><p className='text-orange-500'>go to Shop</p></Link>)
                : null}
            </div>
              :
              <div className=''>
                <Link to='/signup' className=''>Sign Up</Link>
                <Link to='/login' className='ml-4'>Log in</Link>
              </div>
            }

          </ul>
        </div>
        {/* <div className='flex w-96' > */}
        {/* <label className="relative block" ref={searchRef}>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <img src={lookup} alt="Search icon" className="h-5 w-5" />
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Search for anything..."
                        type="text"
                        name="search"
                        value={searchTerm}
                        onChange={(e)=>handleSearch(e)} />
                    {showDropdown &&  (
                    <ul className='absolute bg-slate-100 border border-gray-200 rounded-md  mt-1 z-10'>
                        {filteredProducts.length > 0 ? filteredProducts.map(item => (
                            <Link to={`/productDetail/${item.id}`}><li className='flex p-1 hover:bg-slate-300 w-52 rounded-md' key={item.id}>
                                <img className='w-6' src={item.image} alt={item.productName} />
                                <p className='text-xs'>{item.productName}</p>
                            </li></Link>
                        )) : (
                            <li className='p-2 text-sm text-gray-500 w-52 text-center'>No results found</li>
                        )}
                    </ul>
                )}
                </label> */}
        {/* <div className='relative'>
                    {favoriteCount > 0 ?
                        <div className='absolute left-5 px-1 w-4 text-center text-xs rounded-full text-white bg-red-600'>{favoriteCount}</div> : ''}
                    <Link to='/wishlist'><img className='w-9 h-9 cursor-pointer' src={Wishlist} alt="" /></Link>
                </div>
                <div className='relative'>
                    {orderCount > 0 ?
                        <div className='absolute left-5 px-1 w-4 text-center text-xs rounded-full text-white bg-red-600'>{orderCount}</div> : ''}
                    <Link to="/checkout"><img className='w-7 h-7 mt-1 cursor-pointer' src={card} alt="" /></Link>
                </div> */}
        {/* {user ? (
                    <div className='relative mt-2'>
                        <span onClick={toggleMenu} className='cursor-pointer text-sm ml-1'>
                            {user.email || "User"}
                        </span>
                        {showMenu && (
                            <div className='absolute mt-2  w-32 bg-white rounded-lg shadow-xl'>
                                <Link to='/profile' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Profile</Link>
                                <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : ""} */}
        {/* </div> */}
      </div>
    </>
  )
}

export default Header