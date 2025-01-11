import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../Redux/Order";
import Loading from "../Components/Loading";
import OrderCard from "./OrderCard";

function AllOrders() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data && data?.data.length >= 1) {
      setLoading(false);
    }
  }, [data]);


  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="min-h-[90vh] w-full p-4 mt-10 flex justify-center items-center">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full min-h-[80vh] m-auto">
            {data?.data?.length > 0 ? (
              data?.data.map((item) => (
                <OrderCard key={item._id} item={item} />
              ))
            ) : (
              <h2>No orders Available here</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AllOrders;
