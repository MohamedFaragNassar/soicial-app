import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../Actions/userActions'

const MainMenu = ({node}) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        //history.push("/welcome")
    }
    return <>
        <div ref={node} id="main_menu" className="w-52 bg-white h-screen absolute top-12 -left-8 flex flex-col items-start justify-start">
                <Link to="/" className="w-max flex items-center justify-start text-lg font-semibold p-6 rounded-full hover:bg-gray-200 " >
                    <i className="fas fa-home"></i>
                    <span className="ml-8 " >Home</span>
                </Link>
                <Link to="/profile" className="w-max flex items-center justify-start text-md font-semibold p-6 rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-user-alt"></i>
                    <span className="ml-8" >Profile</span>
                </Link>
                <Link to="/messages" className="w-max flex items-center justify-start text-md font-semibold p-6 
                rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-comments-alt"></i>
                    <span className="ml-8" >Messages</span>
                </Link>
                <Link to="/notifications" className="w-max flex items-center justify-start text-md font-semibold p-6 
                rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-bell text-lg"></i>
                    <span className="ml-8" >Notifications</span>
                </Link>
               <Link to="/search" className="w-max flex items-center justify-start text-md font-semibold p-6 rounded-full hover:bg-gray-200 lg:hidden "  >
                    <i className="fas fa-search"></i>
                    <span className="ml-8" >Search</span>

                </Link>
                <Link to="/bookmarks" className="w-max flex items-center justify-start text-md font-semibold p-6 rounded-full hover:bg-gray-200 "  >
                    <i className="fas fa-bookmark"></i>
                   <span className="ml-8" >Bookmarks</span>
                </Link>
                <Link to="settings"  className="w-max flex items-center justify-start text-md font-semibold p-6 rounded-full
                     hover:bg-gray-200 "  >
                    <i className="fas fa-cog"></i>
                    <span className="ml-8" >Settings</span>
                </Link>
                <button onClick={handleLogout} to="settings"  className="w-max flex items-center justify-start text-md font-semibold p-6 rounded-full
                     hover:bg-gray-200 "  >
                    <i className="fas fa-sign-out-alt "></i>
                    <span className="ml-8" >Logout</span>
                </button>
        </div>
    </>
}

export default MainMenu
