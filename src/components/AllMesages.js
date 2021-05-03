import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GoBack from './GoBack'
import {useDispatch, useSelector} from 'react-redux'
import {getRooms} from '../Actions/userActions'
const AllMesages = () => {

     
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
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getRooms())
       
    }, [])
    rooms&&console.log(getOtherProfile(rooms[0]))
    return (
        <div>
            <GoBack title="Messages" />
            <div className="w-full flex-col items-start bg-white min-h-screen" >
                {rooms && rooms.map(room => 
                    <Link to={`/messages/${room.user1.id == userData.user.id ? room.user2.id : room.user1.id}`} 
                      className="flex items-center justify-between w-full h-20 p-2
                     hover:bg-gray-100 overflow-hidden  border-b" >
                        <img className="w-12 h-12 rounded-full mb-auto" src="./profile.jpg" />
                        <div className="w-full h-full flex flex-col items-start justify-between" >
                            <div className="w-full mx-2  flex items-center justify-between" >
                                <div>
                                    <span className=" font-semibold">{`${getOtherProfile(room).first_name} 
                                                                        ${getOtherProfile(room).last_name}`}</span>
                                    <span className="text-sm text-gray-400 ml-4">{`@${getOtherProfile(room).username}`}</span>
                                </div>
                                <span className="text-sm text-gray-400 mr-4">{room.createdAt}</span>
                            </div>
                            <div className=" mx-2 w-10/12 truncate ... text-sm">
                                {getLastMessage(room)} 
                            </div>
                        </div>
                   </Link>    
                )}
            </div>
        </div>
    )
}

export default AllMesages
