import React from 'react'
import {Link} from 'react-router-dom'

const Ghuest = () => {
    return (
        <div className="flex flex-col items-center justify-between w-full h-1/2 " >
            <div className="text-2xl font-bold text-blue-600 text-left">Social App</div>
            <div className="text-xl font-semibold w-1/2 text-left" >See what’s happening in the world right now</div>
            <div className="flex flex-col items-center justify-between" >
                <Link to="/welcome/signup" className="px-20 py-2 bg-blue-400 rounded-full font-semibold text-xl text-white" >sign up</Link>
                <Link to="/welcome/signin" className="px-20 py-2 border border-blue-400 rounded-full font-semibold text-xl text-blue-400 mt-5" >Sign in</Link>
            </div>
            <Link to="/" className="border-2 p-2 rounded-xl flex items-center justify-between w-1/3  " >
                <img className="w-12 h-12" src="./account.png"/>
                <span className="font-semibold" >Pre-Made Account</span>
            </Link >
        </div>
    )
}

export default Ghuest
