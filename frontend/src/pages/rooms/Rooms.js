import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import api from "../../API";

const Rooms = () => {

    const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
    const [click, setClick] = useState(false);
    const [errorList, setErrorList] = useState([]);

    const rooms = useLoaderData()

    const handleRoomEntering = (roomId, roomAdmin) => {
        setSelectedRoomInfo({ roomId, roomAdmin });
        setClick(true);
        if (!rooms.find(room => room.id === roomId && room.members.map(member => member.username).includes(roomAdmin))) {
            if (!errorList.includes(roomId)) {
            setErrorList(prevList => [...prevList, roomId]);
            }
            
        };
    }

    const handleRoomHovering = (roomId, roomAdmin) => {
        setSelectedRoomInfo({ roomId, roomAdmin });
        if (!rooms.find(room => room.id === roomId && room.members.map(member => member.username).includes(roomAdmin))) {
            if (!errorList.includes(roomId)) {
                setErrorList(prevList => [...prevList, roomId]);
                }
        };
    }

    return ( 
        <div className="room-list"> 
        
            {/* {rooms.map(room => (
                <div className="room" key={room.id} onMouseEnter={() => handleRoomHovering(room.id, room.admin.username)}>
                    <div className="room-header">
                        <h3>{room.title}</h3>
                        <button onClick={() => handleRoomEntering(room.id, room.admin.username)} onMouseLeave={() => setClick(false)}>enter</button>
                    </div>
                    <div className="hover-room-info">
                    {errorList.includes(room.id) && (
                        <p>incorrect admin verification, room is temporary closed</p>
                    )}
                    {!errorList.includes(room.id) && (
                        <p>online {room.members.length} developers</p>
                    )}
                    </div>
                    {click && selectedRoomInfo && selectedRoomInfo.roomId === room.id && room.members.map(member => member.username).includes(selectedRoomInfo.roomAdmin) && (
                        <div className="room-info">
                            <p>admin: { room.admin.username }</p>
                            <p>id: { room.id }</p>
                        </div>
                    )}
                </div>
            ))} */}
            {rooms.map(room => (
                <div className="room" key={room.id}>
                    <div className="room-header">
                        <Link to={'/rooms/enter/' + room.id}>{room.title}</Link>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default Rooms;

export const roomsLoader = async () => {
    //const res = await fetch('http://localhost:8080/rooms')
    const page = 1;
    const res = await api.get('http://localhost:8000/rooms/' + page)
    console.log(res)
    return res.data
}