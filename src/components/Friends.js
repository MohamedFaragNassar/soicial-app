import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getFollowNotifications,readFollowNotification,relation} from '../Actions/userActions'
const Friends = ({isOpen,node,close}) => {
    const {loading,error,followNotifications} = useSelector(state => state.followNotifications)
    const {newRelation} = useSelector(state => state.makeRelation)
    const dispatch = useDispatch()

    const handleResponse = (username,action)=>{
        dispatch(relation(username,action))
    }

    const hanndleClickNotification = (id,action)=>{
       dispatch(readFollowNotification(id,action))
       dispatch(getFollowNotifications())
       close()
    }
    console.log(newRelation)
    useEffect(() => {
        dispatch(getFollowNotifications())
    }, [])

    if(!isOpen){
        return null
    }
    return <>
        <div ref={node} id="friends" className="flex flex-col items-center w-60  bg-white shadow-lg 
        absolute top-8 -right-28 rounded-lg pb-4 pt-2 border ">
            <button className="p-2 w-full hover:bg-gray-100" onClick={()=>hanndleClickNotification("","all")} >Mark all as read</button>
            {followNotifications&& followNotifications.length > 0 ? <> {followNotifications.slice(0,4).map(n => 
                <div className={`flex items-start justify-between w-full p-4 border hover:bg-gray-50 
                    ${n.is_read?"bg-white":"bg-gray-200"}`} >
                    <img className="w-10 h-10 rounded-full mr-2" src={`/media/${n.user.personal_image}`} />
                    <div className="w-4/5 text-sm" >
                        {
                            n.action == "follow" ? <Link onClick={()=>hanndleClickNotification(n.id,"single")} to={`/profile/${n.user.username}`}>
                                                        {`${n.user.first_name} ${n.user.last_name} started following you`}
                                                    </Link>:
                            n.action == "accept" ? <Link onClick={()=>hanndleClickNotification(n.id,"single")} to={`/profile/${n.user.username}`}>
                                                        {`${n.user.first_name} ${n.user.last_name} accepted your follow request`}
                                                    </Link>:
                            n.action == "request" ? 
                                <div>
                                    <Link to={`/profile/${n.user.username}`}>
                                        {`${n.user.first_name} ${n.user.last_name} send you follow request`}
                                    </Link>
                                    <div className="w-1/2  flex items-center justify-between">
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
            )}
            <Link to="/requests" className="mt-2">See All</Link> </>:
            <div>there is no notifications</div>
        }
        </div>
   </>
}

export default Friends
