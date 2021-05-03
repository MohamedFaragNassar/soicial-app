import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import {accessRooms, getRooms} from '../Actions/userActions'
import ErrorMessage from './ErrorMessage'
import { Link } from 'react-router-dom'

const ChatRoom = (props) => {

        const id =props.match.params.id;
      
        const {loading,error,room} = useSelector(state => state.accessRoom)
        const {rooms} = useSelector(state => state.rooms)
        const {profile} = useSelector(state => state.profileDetails)

        const {userData} = useSelector(state => state.userSignIn)
        const [messages,setMessages] = useState(room?.messages)
        const [message,setMessage] = useState()
        let roomName
        if(room){
            roomName = room.name
            
        } 

        console.log(message )

     /*    console.log(messages) */
        
        const chatSocket = useRef(null)
       
        const dispatch = useDispatch()
        const handleSendMessage = () => {
            if(message){
                chatSocket.current.send(JSON.stringify({
                    'message': message,
                    "sender": userData.user.id,
                    "recipiant" : Number(id),
                }));
                setMessage(null)
                const msgInput = document.getElementById("msg-input")
                msgInput.value = null
            }
        };

        
        const getOtherProfile = ()=>{
            if(room.user1.id == userData.user.id){
                return room.user2
            }else{
                return room?.user1
            }
        }
        
        useEffect(() => {
            dispatch(accessRooms(id))
         }, [])
       
        
         useEffect(() => {
           if(roomName){
                chatSocket.current = new WebSocket(
                    'ws://'
                    + window.location.host
                    + '/ws/chat/'
                    + roomName
                    + '/'
                );
                chatSocket.current.onmessage = function(e) {
                    const {message} = JSON.parse(e.data);
                   const data = {
                       content:message,
                       sender: userData.user.id,
                       recipiant:getOtherProfile().id
                   }
                   console.log(data)
                    setMessages((prev)=>[...prev,data])
                };
        
                chatSocket.current.onclose = function(e) {
                    console.error('Chat socket closed unexpectedly');
                };
                return ()=> chatSocket.current.close()
           }
    
        }, [room])

    
    return <>
        { error ? <ErrorMessage message={error} /> : room ? 
        <div className="fixed  h-screen bg-white flex items-center border " style={{left:7.5+"%",top:64+"px",width:85+"%"}} >
           <div className="w-full h-full ">
                <div className="w-full h-3/4 border-b overflow-hidden " >
                    <div className="w-full h-1/12 flex flex-col items-start justify-between pl-5 py-2 border-b " >
                        <span className="text-xl font-bold">
                            {`${getOtherProfile(room).first_name} ${getOtherProfile(room).last_name}`}
                        </span>
                        <span className="text-sm text-gray-400">{`@${getOtherProfile(room).username}`}</span>
                    </div> 
                    <div className="w-full   flex flex-col items-start p-2 overflow-y-scroll" style={{height:88+"%"}} >
                        {messages?.map(msg => 
                            <Message text={msg.content} otherUser={getOtherProfile(room)} type={msg.sender == userData.user.id ? "sent":"recivied"}/>    
                        )}
                    </div>
                </div>
                <div className="w-full h-1/4" >
                    <div className=" flex items-center justify-between p-6 relative" >
                        <input id="msg-input" type="text" placeholder="Type your mesage here" onChange={(e)=>setMessage(e.target.value)}
                        className="w-11/12 ml-4 rounded-full pl-4 pr-10 py-3 border bg-gray-100" />
                        <button className=" mr-2 text-xl" onClick={()=>handleSendMessage()} >
                            <i class="fad fa-paper-plane"></i>
                        </button>
                        <button className="absolute top-8 right-20 text-xl" ><i class="fal fa-smile-beam"></i></button>
                    </div>
                </div>
            </div>
            
        </div>:null}
    </>
}

export default ChatRoom
