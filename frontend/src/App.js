import { createBrowserRouter, createRoutesFromElements,  RouterProvider, Route } from 'react-router-dom';

//pages
import Navbar, { roomRequestLoader } from './pages/Navbar';
import Home from './pages/Home';
import RoomsLayout from './pages/layouts/RoomsLayout';
import RoomDetails, { roomDetailsLoader } from './pages/rooms/RoomDetails';
import Rooms, { roomsLoader }from './pages/rooms/Rooms';
import RoomsError from './pages/rooms/RoomsError';
import GLobalError from './pages/GlobalError';
import SearchingResults from './components/SearchingResults';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import AuthLayout from './pages/layouts/AuthLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />} errorElement={<GLobalError />} loader={roomRequestLoader}>
      <Route index element={<Home />} />
      <Route path="rooms" element={<RoomsLayout />} errorElement={<RoomsError />}>
        <Route index element={<Rooms />} loader={roomsLoader} />
        <Route path="/enter/:id" element={<RoomDetails />} loader={roomDetailsLoader}/> 
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<SignIn />}/>s
        <Route path="registration" element={<SignUp />}/>
      </Route>
    </Route>
  )
);

function App() {
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
