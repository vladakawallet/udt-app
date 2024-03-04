import { useRouteError } from "react-router-dom";

const RoomsError = () => {

    const error = useRouteError()

    return ( 
        <div className="rooms-error">
            <h2>Error</h2>
            <p>{error.message}</p>
        </div>
     );
}
 
export default RoomsError;