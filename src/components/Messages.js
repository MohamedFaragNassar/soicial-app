import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRooms } from '../Actions/userActions'

const Messages = ({isOpen,node}) => {
    const dispatch = useDispatch()
    const {loading,error,rooms} = useSelector(state => state.rooms)
    const {userData} = useSelector(state => state.userSignIn)
    
    const getOtherProfile = (room)=>{
        if(room.user1.id == userData.user.id){
            return room.user1
        }else{
            return room.user2
        }
    }
    const getLastMessage = (room)=>{
        return room.messages.pop().content
    }
    useEffect(() => {
        dispatch(getRooms())
       
    }, [])
    if(!isOpen){
        return null
    }
    return (
        <div ref={node} id="messages" className="flex flex-col items-center w-80  bg-white shadow-lg 
        absolute top-8 -right-36 rounded-lg py-4 border ">
           {rooms?.map(room => 
                <Link to={`/messages/${room.user1.id == userData.user.id ? room.user2.id : room.user1.id}`} 
                 className="flex items-center justify-between w-full h-16 p-2 hover:bg-gray-200 overflow-hidden border-t" >
                 <img className="w-10 h-10 rounded-full" src="./profile.jpg" />
                 <div className="w-full h-full flex flex-col items-start justify-between" >
                    <div className="w-10/12 mx-2  flex items-center justify-between" >
                        <span className=" font-semibold truncate">
                        {`${getOtherProfile(room).first_name} ${getOtherProfile(room).last_name}`}
                        </span>
                        <span className="text-sm text-gray-400">{`@${getOtherProfile(room).username}`}</span>
                        <span className="text-sm text-gray-400">{room.createdAt}</span>
                    </div>
                    <div className=" mx-2 w-8/12 truncate ... text-sm">{getLastMessage(room)} </div>
                 </div>
            </Link>
            )}
            <Link to="/messages" className="border-t" >See All</Link>
        </div>
    )
}

export default Messages
