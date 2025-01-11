import React from "react";

function OrderCard({ item }) {
  const totalQuantity = item?.items?.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
  

  return (
    <div className="md:h-[190px] gap-4 max-h-[190px] md:w-full md:max-w-[300px] shadow-xl rounded-lg flex justify-center items-center flex-col">
      <h2 className="text-sm">Or. Id : {item?._id}</h2>
      <h3>Quantity: {totalQuantity}</h3>
      <p>Total Amount: ${item?.totalAmount}</p>
      <p>Status: {item?.status}</p>
    </div>
  );
}

export default OrderCard;
