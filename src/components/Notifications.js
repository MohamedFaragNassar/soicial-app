import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory,Link} from 'react-router-dom'
import {getNotifications,readNotification} from '../Actions/userActions'
import ErrorMessage from './ErrorMessage'

const Notifications = ({isOpen,node,close}) => {

    const {loading,error,notifications} = useSelector(state => state.getNotifications)
    const dispatch = useDispatch()
    
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getNotifications())
    }, [])

    const hanndleClickNotification = (id,action,parent)=>{
        dispatch(readNotification(id,action))
        dispatch(getNotifications())
        close()
        if(action == "single"){
           history.push(`/post/${parent}`)
        }
    }

    if(!isOpen){
        return null
    }
    return <>
        {loading?<div>loading</div> : error ? <ErrorMessage message={error.message} /> : notifications.length > 0 ?
            <div ref={node} id="notifications" className="flex flex-col items-center w-60  
                bg-white shadow-lg absolute top-8 -right-28 rounded-lg py-4 border ">
                <button onClick={()=>hanndleClickNotification("","all")} >Mark all as read</button>
               {notifications.slice(0,5).map(notification => 
                    <div onClick={() => hanndleClickNotification(notification.id,"single",notification.parent) }
                        className={`flex items-center justify-between cursor-pointer ${notification.is_read?"bg-white":"bg-gray-200"} 
                        w-full p-4 hover:bg-gray-300`} >
                        <img className="w-10 h-10 rounded-full" src="profile.jpg" />
                        <div className="w-4/5 text-sm" >
                           {`${notification.user.first_name} ${notification.user.last_name} ${notification.action} your post `}
                        </div>
                    </div>
                ) }
            
            <Link to="/notifications">See All</Link>
            
        </div>:null}
    </>
}

export default Notifications
