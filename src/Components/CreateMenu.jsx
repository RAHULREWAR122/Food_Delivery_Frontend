import React, { useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addMenu } from "../Redux/Menu";


function CreateMenu({ setShowModel }) {
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    availability: true,
  });
  const [err, setErr] = useState("");
  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();
  

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreateMenu = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      setLoading(false)
      alert("please Login to create Menu");
      return;
    }

    if (!data.name.trim() || !data.category.trim() || !data.price.trim()) {
       setLoading(false)
       alert("All fields are required");
      return;
    }
    const { name, category, price, availability } = data;
    const formData = {
      name,
      category,
      price: Number(price),
      availability,
    };

    try {
      const req =await dispatch(addMenu(formData))
       
      if (addMenu.fulfilled.match(req) && req.payload?.name) {
        alert("Menu added successfully!");
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          setErr(data.message || "Name and price are required");
        } else if (status === 401) {
          setErr(data.message || "Token is required, please login");
        } else if (status === 403) {
          setErr(data.message || "Token is Invalid please login again.");
        } else if (status === 500) {
          setErr(
            data.message || "Internal Server Error. Please try again later."
          );
        }
      } else if (err.request) {
        setErr("No response from server. Please try again later.");
      } else {
        setErr(err.message || "An unexpected error occurred.");
      }
    } finally {
      setShowModel(false);
      setErr("");
      setData({
        name: "",
        category: "",
        price: "",
        availability: "",
      });
      setLoading(false) 
    }
  };

  return (<>
     {loading && <Loading/>}
    <div className="z-[20] fixed h-full top-0 left-0 w-full px-4 bg-gray-200 bg-opacity-50 flex justify-center items-center">
      <div className="relative shadow-xl w-full max-w-md  py-10 rounded-md backdrop-blur-[3px]">
        <button
          onClick={() => setShowModel(false)}
          className="absolute right-0 top-0 bg-red-500 text-white text-xl font-semibold px-2"
        >
          X
        </button>
        <form
          action=""
          className="w-full  flex flex-col gap-6 justify-center items-center px-4"
        >
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            id=""
            className="w-full p-2 rounded-md"
            placeholder="Add New Menu"
          />
          <div className="w-full py-2 flex flex-col gap-3">
          <label htmlFor="category" >Select Category</label>
          <select
            name="category"
            onChange={handleChange}
            value={data.category} 
            id="category"
            className="py-2 rounded-lg bg-white px-2 cursor-pointer"
            defaultValue={"Appetizers"}
          >
            <option  disabled>
              -- Select an option --
            </option>
            <option  value="Appetizers">Appetizers</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>

          </div>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            id=""
            className="w-full p-2 rounded-md"
            placeholder="Price"
          />
          <button
            onClick={handleCreateMenu}
            className="mt-6 bg-sky-400 w-full py-1 text-white hover:bg-sky-500 rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </div>
    </>);
}

export default CreateMenu;
