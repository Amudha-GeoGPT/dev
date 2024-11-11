import { Outlet } from "react-router-dom";
import Headerhome from "../../components/header-home/header-home";
const Headerlayout = () => (
  <>  
     <Headerhome/>
    <Outlet />
  
  </>
);

export default Headerlayout;