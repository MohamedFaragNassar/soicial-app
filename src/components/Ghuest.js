import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { login } from '../Actions/userActions'

const Ghuest = () => {
    const dispatch = useDispatch()
    const handleLogin = () => {
        dispatch(login("mfnemo66","123"))
    }
    return (
        <div className="flex flex-col items-center justify-between w-full h-2/3 md:h-1/2 " >
            <div className="text-2xl font-bold text-blue-600 text-left">Social App</div>
            <div className="text-xl font-semibold w-2/3 md:w-1/2 text-left" >See what’s happening in the world right now</div>
            <div className="flex flex-col items-center justify-between" >
                <Link to="/welcome/signup" className="px-20 py-2 bg-blue-400 rounded-full 
                font-semibold text-xl text-white hover:bg-blue-500" >sign up</Link>
                <Link to="/welcome/signin" className="px-20 py-2 border border-blue-400 
                rounded-full font-semibold text-xl text-blue-400 mt-5 hover:bg-blue-400 hover:text-white" >Sign in</Link>
            </div>
            <button onClick={()=>handleLogin()}
            className="border-2 p-2 rounded-xl flex items-center justify-between w-4/5 md:w-1/3 hover:bg-gray-100 ">
                <img className="w-12 h-12" 
                src="https://res.cloudinary.com/dt3fknrkp/image/upload/v1620342521/media/personalImages/account_yvnwmh.png"/>
                <span className="font-semibold" >Pre-Made Account</span>
            </button >
        </div>
    )
}

export default Ghuest
