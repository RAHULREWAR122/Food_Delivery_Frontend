import Home from './Pages/Home';
import Login from './Pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Protected from './Protect';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import AllMenu from './Pages/AllMenu';
import AllOrders from './Pages/AllOrders';
import EditMenu from './Pages/EditMenu';
import Cart from './Pages/Cart';


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<AllMenu/>} />
          <Route path="/orders" element={<Protected><AllOrders/></Protected>} />
          <Route path="/cart" element={<Cart/>}/>
       </Route>  
          <Route path="/login" element={<Login/>} />        
          <Route path="/register" element={<Register/>} />        
          <Route path="*" element={<div>Error Page Not Found</div>} />        
        </Routes>
      </Router>

    </>
  );
}


function Layout() {
 
  return (
    <>
      <Navbar/>
     <Outlet/>
    </>
  );
}

export default App;
