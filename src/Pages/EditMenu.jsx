import React, { useState } from "react";
import axios from "axios";
 
function EditMenu({ data ,setShowEditForm}) {
 
    
  const {id, name, category, price, availability = true} = data;
  const [formData, setFormData] = useState({
    name,
    category,
    price: Number(price),
    availability,
  });

  const token = JSON.parse(localStorage.getItem('token'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdateMenu = async (e) => {
    e.preventDefault();
    
    const {name , price , category , availability = true} = formData
    const sendData = {
        name , 
        category,
        price : Number(price),
        availability
    }

    if(!formData.name.trim() || formData.price === '' || !formData.category.trim()){
         alert("all fields are required");
         return;
    }

    try {
        const req = await axios.put(`https://food-management-api.vercel.app/api/updateMenu/${id}` , sendData , {
             headers : {
                "Authorization" : `${token}`
             }
        })
        if(req.status === 200){
             alert(req.data?.message || "Update success");
        }
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            if (status === 400) {
              alert(data.message || "Name and price are required");
            } else if (status === 401) {
              alert(data.message || "Token is required, please login");
            } else if (status === 403) {
              alert(data.message || "Token is Invalid please login again.");
            } else if (status === 500) {
              alert(
                data.message || "Internal Server Error. Please try again later."
              );
            }
          } else if (err.request) {
            alert("No response from server. Please try again later.");
          } else {
            alert(err.message || "An unexpected error occurred.");
        }
    }finally{
        setShowEditForm(false)
    }

    
};

  return (
    <div className="fixed left-0 top-0 h-full w-full bg-gray-200 bg-opacity-55 flex justify-center items-center">
        <div className="relative shadow-xl w-full max-w-md  py-10 rounded-md backdrop-blur-[3px]">
        <button
          onClick={() => setShowEditForm(false)}
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
            value={formData.name}
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
            value={formData.category} 
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
            value={formData.price}
            onChange={handleChange}
            id=""
            className="w-full p-2 rounded-md"
            placeholder="Price"
          />
          <button
            onClick={handleUpdateMenu}
            className="mt-6 bg-sky-400 w-full py-1 text-white hover:bg-sky-500 rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMenu;
