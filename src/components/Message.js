import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Message = ({type,text,otherUser}) => {
    const {profile} = useSelector(state => state.profileDetails)

    
    if(type==="sent"){
        return <>
            {profile&&<div className="flex items-center justify-start mt-6 ">
                <Link to={`/profile`}>
                    <img className="w-10 h-10 rounded-full shadow-lg " src={`/media/${profile.personal_image}`} />
                </Link>
                <div className="shadow-lg p-2 border ml-2 rounded-lg bg-blue-200 text-left break-words break-all"
                    style={{maxWidth:70+"%"}}>
                    {text}
                </div>
            </div>}
        </>
    }else{
        return (
            <div className="flex items-center justify-end mt-6 ml-auto " style={{maxWidth:70+"%"}}>
                <div className="shadow-sm p-2 border mr-2 rounded-lg bg-gray-200 text-right ml-auto ">
                    
                    {text}
                </div>
                <Link to={`/profile/${otherUser?.username}`}>
                <img className="w-10 h-10 rounded-full shadow-lg " src={`/media/${otherUser?.personal_image}`} />
                </Link>
            </div>
        )
    }
}

export default Message
