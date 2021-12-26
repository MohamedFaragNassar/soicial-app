import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getFollowNotifications, getNotifications, logout} from '../Actions/userActions'
import {useSelector } from "react-redux"
import {getProfile, updateProfile} from '../Actions/userActions'
import ErrorMessage from './ErrorMessage'
import Number from './Number'

const LeftSide = () => {

    const {loading,error,profile} = useSelector(state => state.profileDetails)
    const {updatedProfile} = useSelector(state => state.updateProfile)
    const {followNotifications} = useSelector(state => state.followNotifications)
    const {notifications} = useSelector(state => state.getNotifications)

    const num = notifications?.filter(e => !e.is_read).length+followNotifications?.filter(e => !e.is_read).length
    
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        //history.push("/welcome")
    }

    /* if(error){
        dispatch(logout())
    } */
    
    useEffect(() => {
        if(!profile){
            dispatch(getProfile())
        }
        dispatch(getNotifications())
        dispatch(getFollowNotifications())
    }, [updatedProfile])

    return <>
       {loading?<div>loading</div>: error ? <ErrorMessage /> : profile ? 
       <div className="left-side h-screen border-r fixed  top-0 pt-20 hidden md:flex flex-col"  >
            <div className="flex items-center p-2 ">
                <img className="lg:w-16 lg:h-16 w-14 h-14  rounded-full"
                 src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${profile.personal_image}`} alt="profile" />
                <div className=" flex-col ml-2 hidden lg:flex" >
                    <Link className="text-lg font-bold" to="/profile" >
                        {`${profile.first_name} ${profile.last_name}`}
                    </Link>
                    <span>{`@${profile.username}`}</span>
                </div>

            </div>
            <div className="flex flex-col items-start justify-center mt-10  " >
                <Link to="/" className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full hover:bg-gray-200 " >
                    <i className="fas fa-home"></i>
                    <span className="ml-10 hidden lg:block " >Home</span>
                </Link>
                <Link to="/profile" className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-user-alt"></i>
                    <span className="ml-10 hidden lg:block" >Profile</span>
                </Link>
                <Link to="/notifications" className="w-max flex items-center justify-start text-lg font-semibold 
                    px-6 py-4 md:py-6 rounded-full hover:bg-gray-200 "  >
                    <span className="relative">
                        <i className="fas fa-bell text-lg"></i>
                        {num>0&&<Number number={num} right={2}/>}
                    </span>
                    <span className="ml-10 hidden lg:block" >Notifications</span>
                </Link>
                <Link to="/search" className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full hover:bg-gray-200 lg:hidden "  >
                    <i className="fas fa-search"></i>
                </Link>
                <Link to="/bookmarks" className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-bookmark"></i>
                   <span className="ml-10 hidden lg:block" >Bookmarks</span>
                </Link>
                <Link to="/settings"  className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full
                     hover:bg-gray-200 "  >
                    <i className="fas fa-cog"></i>
                    <span className="ml-10 hidden lg:block" >Settings</span>
                </Link>
                <button onClick={handleLogout} to="settings"  className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full
                     hover:bg-gray-200 "  >
                    <i className="fas fa-sign-out-alt "></i>
                    <span className="ml-10 hidden lg:block" >Logout</span>
                </button>
            </div>
        </div>:null}
    </>
}

export default LeftSide
