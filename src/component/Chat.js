import React, { useEffect, useState } from 'react'
import { addDoc,collection,onSnapshot,orderBy,query,serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

import '../styles/Chat.css'

export const Chat = (props) => {
    
    const {room} = props;
    
    const [newMessage,setNewMessage] = useState('');
 
    const [messages,setMessages] = useState([])


    const messageRef = collection(db,"messsages");

    useEffect(()=>{
        // find the the changes in the data base
        // 1 # select the the messages query from the data base
        const queryMessages = query(messageRef,where("room" , "==" ,room),orderBy("createdAt"));

        console.log(query(messageRef,where("room" , "==" ,room)));


        //on snapshot is function that allow the changes in the database in fire store
       const unsuscribe = onSnapshot(queryMessages, (snapshot)=>{
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            /*onSnapshot(queryMessages, (snapshot) => {
            let messages = [];*/
            setMessages(messages);
            console.log(messages);
            console.log(auth);
        })
        return ()=> unsuscribe();
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(newMessage === "") return;

        await addDoc(messageRef,{
            text : newMessage,
            createdAt : serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        setNewMessage("");
    }


  return (
    <div className='chat-app' onSubmit={handleSubmit}>
        <div className='header'><h1>Welcome to {room} Room</h1></div>
        <div className='messages'>
            {messages.map((message)=>
            <div className='message' key={message.id} style={{flexDirection: message.user !== auth.currentUser.displayName ? 'row-reverse' : 'flex'}}>
                <span className='user' >{message.user}</span>
                <span className='message-span'>{message.text}</span>
            </div>)}
            </div>
        <form className='new-message-form'>
            <input 
              placeholder='Type your message here ...' 
              className='new-message-input'
              onChange={(e)=>(setNewMessage(e.target.value))}
              value={newMessage}
            />
            <button type='submit' className='send-button'>Send</button>
        </form>

    </div>
  )
}
