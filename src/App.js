
import { useState,useRef } from 'react';
import './App.css';
import { Auth } from './component/Auth';
import Cookies from 'universal-cookie'
import { Chat } from './component/Chat';
import {signOut} from 'firebase/auth'
import { auth } from './firebase-config';

const cookie = new Cookies();

function App() {
  const [isAuth,setAuth] = useState(cookie.get("auth-token"));
  const [room,setRoom] = useState(null);
  const roomRefInput = useRef(null);

  const signUserOut = async ()=>{
    await signOut(auth);
    cookie.remove("auth-token");
    setAuth(false);
    setRoom(null);
  }

  if(!isAuth){
  return (
    <div className="App">
      <Auth setAuth={setAuth} />
    </div>
  );}
  return(
    <div>
      {room ? (<Chat room={room}/>):
      <div className='room'>
        <label>Enter Room Name:</label>
        <input ref={roomRefInput}/>
        <button onClick={()=>setRoom(roomRefInput.current.value)}>Enter Chat</button>
      </div>}
      <button onClick={signUserOut} className='sign-out'>Sign Out</button>
    </div>
  )
}

export default App;
