import React, { useEffect, useState } from "react";
import Card from "./Card";
import CreateMenu from "../Components/CreateMenu";
import { useDispatch, useSelector } from "react-redux";
import { allMenu, deleteMenu } from "../Redux/Menu";
import { useNavigate } from "react-router";
import Loading from "../Components/Loading";
import axios from "axios";
import EditMenu from "./EditMenu";

function AllMenu() {
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.menuReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  
  const token = JSON.parse(localStorage.getItem('token'))
  const [showEditForm , setShowEditForm] = useState(false);
  const [editData , setEditData] = useState({
    name: "",
    category: "",
    price: "",
    availability: true,
  })
  
     
  useEffect(() => {
    dispatch(allMenu());
  }, [dispatch, navigate, showModel , loading , loading1, showEditForm]);

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setLoading(false);
    }
  }, [data, navigate , loading , loading1 ,showModel , showEditForm]);
   


  const handleDeleteMenu = async(id)=>{
    setLoading1(true); 
    try {
       const req = await axios.delete(`https://food-management-api.vercel.app/api/removeMenu/${id}` ,{
        headers : {
             "Authorization" : `${token}`
        }
       })      
       if(req.status === 200){
         alert(req?.data?.message || " Deleted Success");
      }else{
        alert("Please try again")
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
        setTimeout(()=>{
            setLoading1(false);
        },3000)
    }
  } 
  
  const handleEditMenu = (data)=>{
    setEditData(data);         
    setShowEditForm(true);   
  }
   

  return (
    <>
      {loading && <Loading />}
      {loading1 && <Loading />}
      {showEditForm && <EditMenu data={editData} setShowEditForm={setShowEditForm}/>}    
      {data?.data && data?.data.length > 0 ? (
        <>
          {showModel && <CreateMenu setShowModel={setShowModel} />}

          <div className="min-h-[90vh]  flex items-center justify-center flex-col p-4">
            {data?.data && data?.data.length > 0 && (
              <div className="w-full p-3 flex justify-end mb-4">
                <button
                  onClick={() => setShowModel(true)}
                  className="bg-sky-400 text-white px-4 py-2 rounded-md"
                >
                  Create Menu
                </button>
              </div>
            )}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 w-full h-full">
              {data?.data &&
                data?.data.map((card, index) => (
                  <Card
                    key={index}
                    id={card._id}
                    name={card.name}
                    category={card.category}
                    price={card.price}
                    handleDeleteMenu={handleDeleteMenu}
                    handleEditMenu = {handleEditMenu}
                    link ={"menu"}
                    />
                ))}
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-2xl text-center">
          Wait
        </h2>
      )}
    </>
  );
}

export default AllMenu;
