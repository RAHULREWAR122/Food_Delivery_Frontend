import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNav , setShowNav] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
    showNav(false);
  };

  return (
    <div className="bg-green-500 h-[60px] px-5 w-full flex items-center justify-between shadow-md ">
      <NavLink to="/" className="text-2xl font-bold text-white hover:text-gray-200">
        Food
      </NavLink>
   <div className="hidden sm:flex flex-1 justify-center items-center space-x-8">
        <><NavLink
          to="/menu"
          className="text-white text-lg hover:text-gray-200 transition"
        >
          All Menu
        </NavLink>
        <NavLink
              to="/cart"
              className="text-white text-lg hover:text-gray-200 transition"
            >
              Cart
            </NavLink>
        </>
        {user && (
          <>
            <NavLink
              to="/orders"
              className="text-white text-lg hover:text-gray-200 transition"
            >
              My Orders
            </NavLink>
           
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="bg-blue-500 text-white text-lg w-10 h-10 flex items-center justify-center rounded-full">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            LogIn
          </NavLink>
        )}
      </div>

      <div className="sm:hidden flex items-center ">
        <button onClick={()=>setShowNav(!showNav)} className="text-white text-2xl">
          ☰
        </button>
      </div>
      <div className={`z-[50] sm:hidden absolute left-0 w-full bg-green-500 shadow-lg transition-all duration-300 ease-in-out ${showNav ? 'top-[60px]' : 'top-[-100%] '}`}>
        <div className="flex flex-col items-center space-y-4 py-4">
        <> <NavLink
            to="/menu"
            className="text-white text-lg hover:text-gray-200 transition"
          >
            All Menu
          </NavLink>
          <NavLink
                to="/cart"
                className="text-white text-lg hover:text-gray-200 transition"
              >
                Cart
              </NavLink>
         </>
          {user && (
            <>
              <NavLink
                to="/orders"
                className="text-white text-lg hover:text-gray-200 transition"
              >
                My Orders
              </NavLink>
             
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
