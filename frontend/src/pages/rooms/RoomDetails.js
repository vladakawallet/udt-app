import { useLoaderData, useParams } from "react-router-dom";
import api from "../../API";

const RoomDetails = () => {
    const { id } = useParams()
    const room = useLoaderData()


    return ( 
                <div className="room-details">
                    <h1>{room.title}</h1>
                    <h2>{room.admin}</h2>
                    <h2>{room.id}</h2>
                </div>
    )
    }
 
export default RoomDetails;

export const roomDetailsLoader = async ({ params }) => {
    // const { id } = params
    const res = await api.get('http://localhost:8000/rooms/enter/' + params.id);
    console.log(res.data);
    return res.data;
}