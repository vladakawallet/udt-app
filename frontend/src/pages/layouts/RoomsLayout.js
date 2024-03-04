import { Outlet } from "react-router-dom";


const RoomsLayout = () => {


    return ( 
        <div className="rooms-layout">     
            <h1>currently available rooms</h1>

            <Outlet />
        </div>
     );
}
 
export default RoomsLayout;

