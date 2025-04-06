import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-white/95 backdrop-blur-sm shadow-sm items-center border-b border-gray-100'>
        <h2 className='cursor-pointer uppercase font-bold text-primary text-lg'>
          <Link to="/"> Task Manager </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all">
                <Link to='/tasks/add' className='block w-full h-full px-4 py-2 flex items-center gap-2'> 
                  <i className="fa-solid fa-plus"></i> Add task 
                </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-100 transition rounded-lg'>
                <Link to="/profile" className="flex items-center gap-2">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-100 transition rounded-lg flex items-center gap-2' onClick={handleLogoutClick}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm'><Link to="/login">Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>


        {/* Navbar displayed as sidebar on smaller screens */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-medium text-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-primary hover:bg-primary-dark text-white font-medium transition py-2 px-3">
                  <Link to='/tasks/add' className='block w-full h-full'> <i className="fa-solid fa-plus"></i> Add task </Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm'>
                  <Link to="/profile">Profile</Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
              </>
            ) : (
              <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm'><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar