import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../Redux/Order";
import Loading from "../Components/Loading";


function Card({ id, name, category, price, qty=1 , handleDeleteMenu, handleEditMenu, link  , handleRemove }) {
  
  const [loading ,setLoading] = useState(false);
  
  const data = {
    id,
    name,
    category,
    price,
    qty 
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  

  const handleAddToCart = (data) => {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
 
    const existingItemIndex = cart.findIndex((item) => item.id === data.id);
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].qty += 1;
    } else {
      cart.push({ ...data, qty: 1 });
    }
    localStorage.setItem("myCart", JSON.stringify(cart));
    alert("Item added to cart.");
  };
  
  
  const handleOrderItem = async()=>{
     setLoading(true);
    
     if(!user && !user?.username){
        alert("Please Login to order product.")
        setLoading(false);
        return    
     }
    const totalAmount = Number(qty * price);
      
      const data ={
         userId : user?._id,
         items : [
             {menuItemId : id , quantity : qty},
         ],
         totalAmount : totalAmount,
         status : "Pending"
      } 

      try {
        const req = await dispatch(addOrder(data));
        if(addOrder.fulfilled.match(req) && req.payload){
          alert(`Order Placed Successfully. , order id is ${req?.payload?._id}`)
        }       
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 400) {
            alert((data.message || "Name and price are required"));
          } else if (status === 401) {
            alert((data.message || "Token is required, please login"));
          } else if (status === 403) {
            alert((data.message || "Token is Invalid please login again."));
          } else if (status === 500) {
            alert((
              data.message || "Internal Server Error. Please try again later."
            ));
          }
        } else if (err.request) {
          alert(("No response from server. Please try again later."));
        } else {
          alert((err.message || "An unexpected error occurred."));
        } 
      }finally{
        setLoading(false);
      }
  }

  return (<>
     {loading && <Loading/>}
    <div className="h-auto bg-[#e7eaebc0] shadow-md rounded-lg p-4 flex flex-col items-center justify-between">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-500 mb-2">Category: {category}</p>
      {link === 'cart' && <p className="text-gray-500 mb-2">Quantity : {qty}</p>}
      <p className="text-blue-600 font-bold mb-4">${price}</p>

      {link === "menu" && (
        <div className="w-full flex-col flex gap-1  justify-evenly items-center">
          <button
            onClick={() => handleEditMenu(data)}
            className="w-full px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={()=>handleAddToCart(data)}
            className="w-full px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
           >
            Add to Cart
          </button>
          <button
            onClick={() => handleDeleteMenu(id)}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}

      {link === "cart" && (<div className="flex w-full justify-around items-center">
        <button
          onClick={handleOrderItem}
          className="px-6 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Buy
        </button>
        <button
          onClick={() => handleRemove(id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
        
        </div>)}
    </div>
    </> );
}

export default Card;
