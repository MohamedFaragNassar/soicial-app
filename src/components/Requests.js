import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import GoBack from './GoBack'
import {relation} from '../Actions/userActions'

const Requests = () => {
    const {followNotifications} = useSelector(state => state.followNotifications)
    const dispatch = useDispatch()

    const handleResponse = (username,action)=>{
        dispatch(relation(username,action))
    }
    return <>
        <GoBack title="Requests"/>
        <div  id="friends" className="flex flex-col items-center w-full  bg-white">
        {followNotifications&& followNotifications.length > 0 ?followNotifications.map(n => 
                <div className="flex items-start justify-start w-full p-4 border hover:bg-gray-50" >
                    <img className="w-10 h-10 rounded-full mr-4" src={`/media/${n.user.personal_image}`} />
                    <div className="w-4/5 text-sm" >
                        {
                            n.action == "follow" ? <Link to={`/profile/${n.user.username}`}>
                                                        {`${n.user.first_name} ${n.user.last_name} started following you`}
                                                    </Link>:
                            n.action == "accept" ? <Link to={`/profile/${n.user.username}`}>
                                                        {`${n.user.first_name} ${n.user.last_name} accepted your follow request`}
                                                    </Link>:
                            n.action == "request" ? 
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
