import { Link } from "react-router-dom";

const SearchingResults = ({result, focus}) => {
    return ( 
        <div className="results-container">
            {focus && result.map((res, id) => {
                return <Link to={'/rooms/enter/' + res.id} className="result" key={id} >
                    <h3>{res.title}</h3>
                    <h4>{res.admin}</h4>
                    {/* <h5>online: {res.members.length} developers</h5> */}
                </Link>
            })}
        </div>
     );
}
 
export default SearchingResults;

