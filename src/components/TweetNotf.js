import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getNotifications,readNotification} from '../Actions/userActions'
import ErrorMessage from './ErrorMessage'
import Spinner from './Spinner'
const TweetNotf = () => {
    const dispatch = useDispatch()
    const {loading,error,notifications} = useSelector(state => state.getNotifications)
    const history = useHistory()
    useEffect(() => {
        dispatch(getNotifications())
    }, [])

    const hanndleClickNotification = (id,action,parent)=>{
        dispatch(readNotification(id,action))
        if(action == "single"){
           history.push(`/post/${parent}`)
        }
    }
    return <>
    {loading?<Spinner /> : error ? <ErrorMessage message={error.message} /> :null}
     {notifications?.legnth > 0 && <button className="w-full border p-2 hover:bg-gray-200 bg-white" 
            onClick={()=>hanndleClickNotification("","all")} >Mark all as read</button>}
            <div>
                {notifications?.map(notification => 
                    <div onClick={() => hanndleClickNotification(notification.id,"single",notification.parent) }
                        className={`flex items-center justify-start cursor-pointer border-b 
                        ${notification.is_read?"bg-white":"bg-gray-100"} 
                        w-full p-4 hover:bg-gray-200`} >
                        <img className="w-10 h-10 rounded-full" src="profile.jpg" />
                        <div className="w-4/5 text-sm ml-5" >
                           {`${notification.user.first_name} ${notification.user.last_name} ${notification.action} your post `}
                        </div>
                    </div>
        ) }
    </div>
    </>
}

export default TweetNotf
