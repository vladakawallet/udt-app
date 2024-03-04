import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return ( 
        <div className="auth-container">
            <div className="heading">
                <h1 className="U">united</h1>
                <h1 className="D">development</h1>
                <h1 className="T">teams</h1>
            </div>
            <div className="authform-container">
                <Outlet />
            </div>
        </div>
     );
}
 
export default AuthLayout;