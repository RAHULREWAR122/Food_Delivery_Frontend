import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Card from "./Card";

function Cart() {
  const cart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [loading, setLoading] = useState(true);
  const [ref , setRef] = useState('');

  useEffect(() => {
    if (cart && cart.length > 0) {
      setLoading(false);
    }else if(cart && cart.length === 0){
        setLoading(false);
    }
  }, [cart , loading , ref]);
  
   
  const handleRemove = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setRef(itemId + ' : ' + itemId);
    alert("Item removed from cart.");
      
  };

  return (
    <>
      {loading && <Loading />}
      <div className="h-full p-4 w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 ">
        {cart.length > 0 ? 
          cart.map((item, i) => {
            return (
              <Card
                key={i}
                name={item.name}
                category={item.category}
                price={item.price}
                qty={item.qty}
                link={"cart"}
                id={item.id}
                handleRemove={handleRemove}
              />
            )
          } ) : <h2 className="text-2xl text-center">No items Available in Cart.</h2>}
      </div>
    </>
  );
}

export default Cart;
