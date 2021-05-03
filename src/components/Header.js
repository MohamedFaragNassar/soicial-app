import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Notifications from './Notifications'
import Messages from './Messages'
import {useClickToClose} from '../helpers/CTC'
import Friends from './Friends'
import { useSelector } from 'react-redux'
import Number from './Number'
import Search from './Search'
import MainMenu from './MainMenu'

const Header = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isMessagesOpen,setIsMessagesOpen] = useState(false)
    const [isFriendsOpen,setIsFriendsOpen] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const {profile} = useSelector(state => state.profileDetails)

    const {loading,error,notifications} = useSelector(state => state.getNotifications)
    const {followNotifications} = useSelector(state => state.followNotifications)
    
    const NotificationsNode = useClickToClose(()=>setIsNotificationsOpen(false),"#notifications")
    const messagesNode = useClickToClose(()=>setIsMessagesOpen(false),"#messages")
    const friendsNode = useClickToClose(()=>setIsFriendsOpen(false),"#friends")
    const menuNode = useClickToClose(()=>setIsOpen(false),"#main_menu")
    
    return <>
       { profile&&<header className="w-full border-b-2 h-16 fixed top-0 z-10 bg-white" >
            <div className="h-full m-auto flex justify-start  md:justify-between items-center" style={{width:85+"%"}} >
            <button className="md:hidden relative" onClick={()=>setIsOpen(true)}>
                <img className="w-10 h-10  rounded-full" src={`/media/${profile.personal_image}`} alt="profile" />
                {isOpen&&<MainMenu node={menuNode} />}
            </button>
            <Link className="text-2xl font-bold text-blue-600 ml-4 " to="/" >Social App</Link>
            <Search type="header" />
            <div className=" hidden md:flex justify-between items-center w-40 h-full mr-4  " >
                <div className="relative">
                    <button onClick={()=>setIsNotificationsOpen(true)} ><i className="fas fa-bell text-lg"></i></button>
                    <Notifications isOpen={isNotificationsOpen} node={NotificationsNode} close={()=>setIsNotificationsOpen(false)} />
                    {!isNotificationsOpen&&notifications&&notifications.filter(e => !e.is_read).length>0?
                    <Number number={notifications.filter(e => !e.is_read).length} right={2} />:null}
                </div>
                <div className="relative">
                    <button onClick={()=>setIsMessagesOpen(true)} ><i className="fas fa-comments-alt"></i></button>
                    <Messages isOpen={isMessagesOpen} node={messagesNode}  />
                </div>
                <div className="relative">
                    <button onClick={()=>setIsFriendsOpen(true)} ><i className="fas fa-user-plus"></i></button>
                    <Friends isOpen={isFriendsOpen} node={friendsNode} close={()=>setIsFriendsOpen(false)} />
                    {!isFriendsOpen&&followNotifications&&followNotifications.filter(e => !e.is_read).length>0?
                    <Number number={followNotifications.filter(e => !e.is_read).length} right={3} />:null}
                </div>
            </div>
            </div>
      </header>}
   </>
}

export default Header
