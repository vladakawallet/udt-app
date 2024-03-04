import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import SearchingBar from "../components/SearchingBar";
import { useState } from "react";
import SearchingResults from "../components/SearchingResults";
import api from "../API";

const Navbar = () => {

        const room = useLoaderData()

        const [result, setResult] = useState([])
        const [focus, setFocus] = useState(false)

    return ( 
        <div className="root-layout">
                <header>
                        <nav className="navbar">
                                <h1>united development teams</h1>
                                <NavLink to="/" className="img-link">
                                        <span><i className="fa-solid fa-house"></i></span>
                                        <div><span className="tooltiptext">home</span></div> 
                                </NavLink>
                                <NavLink to="/rooms" className="img-link">
                                        <span><i className="fa-solid fa-users-rectangle"></i></span>
                                        <div><span className="tooltiptext">rooms</span></div>                                  
                                </NavLink>
                                <SearchingBar setResult={setResult} setFocus={setFocus}/>   
                                <SearchingResults result={result} focus={focus} />
                                <Link to="/auth/login" className="signin-link">log in</Link>
                                <div className="vertical-line"></div>
                                <Link to="/auth/registration" className="signup-link">sign up</Link>
                        </nav>       
                </header>
                <main>
                {room ? (
                    <div className="room-details">
                        <h1>{room.title}</h1>
                        <h2>{room.admin}</h2>
                        <h2>{room.id}</h2>
                    </div>
                ) : (
                    <Outlet />
                )}
                </main>
        </div>            
     );
}
 
export default Navbar;

export const roomRequestLoader = async ({ request }) => {
        let url = new URL(request.url)
        let id = url.searchParams.get("search")

        if(!id) {
                return null
        }

        //const res = await fetch ('http://localhost:8000/rooms/' + id)
        const res = await api.get('http://localhost:8000/rooms/enter/' + id)
        return res.json()
}