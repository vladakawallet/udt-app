import { Link } from "react-router-dom";

const GLobalError = () => {


    return ( 
        <div className="global-error">
            <h1>oops, something went wrong...
                <span><h5>{'\n'}we couldn't find that page</h5></span>
            </h1>
            <Link to="/">home page</Link>

        </div>
     );
}
 
export default GLobalError;