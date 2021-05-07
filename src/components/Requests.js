import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {REQUEST_RESPONSE} from '../Constants/userConstants'
import {getFollowNotifications, relation,readFollowNotification} from '../Actions/userActions'

const Requests = () => {
    const {followNotifications} = useSelector(state => state.followNotifications)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleResponse = (username,action)=>{
        dispatch(relation(username,action))
        if(action == "accept" || action=="reject"){
            dispatch({type:REQUEST_RESPONSE,payload:username})
        }
    }
    const hanndleClickNotification = (id,action,username)=>{
        dispatch(readFollowNotification(id,action))
        if(action == "single"){
           history.push(`/profile/${username}`)
        }
    }
    useEffect(() => {
        dispatch(getFollowNotifications())
    }, [])
    return <>
        <div  id="friends" className="flex flex-col items-center w-full  bg-white">
        {followNotifications&& followNotifications.length > 0 ?followNotifications.map(n => 
                <div className={`flex items-start justify-start cursor-pointer w-full p-4 border ${n.is_read?"bg-white":"bg-gray-100"}`} >
                    <img className="w-10 h-10 rounded-full mr-4" src={`/media/${n.user.personal_image}`} />
                    <div className="w-4/5 text-sm" >
                        {
                            n.action=="follow" ? <div onClick={() => hanndleClickNotification(n.id,"single",n.user.username)}>
                                                        {`${n.user.first_name} ${n.user.last_name} started following you`}
                                                    </div>:
                            n.action=="accept" ? <div onClick={() => hanndleClickNotification(n.id,"single",n.user.username)}>
                                                        {`${n.user.first_name} ${n.user.last_name} accepted your follow request`}
                                                    </div>:
                            n.action=="request" ? 
                                <div>
                                    <Link to={`/profile/${n.user.username}`}>
                                        {`${n.user.first_name} ${n.user.last_name} send you follow request`}
                                    </Link>
                                    <div className="w-1/5 mt-2  flex items-center justify-between">
                                        <button onClick={()=>handleResponse(n.user.username,"reject")} 
                                        className="outline-none text-red-500 hover:text-red-600">
                                            <i className="fas fa-user-times text-lg outline-none"></i>
                                        </button>
                                        <button onClick={()=>handleResponse(n.user.username,"accept")}
                                        className="outline-none text-green-500 hover:text-green-600" >
                                            <i className="fas fa-user-check text-lg outline-none"></i>
                                        </button>
                                    </div>
                                </div>:null
                        }
                    </div>
                </div>
            ):null}
           
       
        </div>
    </>
}

export default Requests
