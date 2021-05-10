import React from 'react'
import {Link} from 'react-router-dom'


const InterActions = ({isOpen,node,close,users}) => {
    
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10 " ></div>
        <div id="interActions" ref={node} className="lg:w-1/2 md:w-5/6 fixed w-11/12  top-10 rounded-2xl
          bg-white flex flex-col items-center justify-between py-4 z-20" >
            <div className="w-full p-1 border-b flex items-start" >
                <button onClick={close}><i className="fal fa-times-circle text-xl ml-2"></i></button>
            </div>

            {users&&users.map(user => 
                <div className="flex flex-col items-center p-2 bg-white  w-full justify-between border-b">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-center w-3/4" >
                            <img className="w-12 h-12 rounded-full" 
                            src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620330129/media/personalImages/${user.id}.jpg`} 
                            alt="profile" />
                            <div className="flex flex-col items-start ml-2 w-full" >
                                <Link className="text-lg font-medium truncate w-2/3" to={`/profile/${user.username}`} >
                                    {`${user.first_name} ${user.last_name}`}
                                </Link>
                                <span className="text-gray-400" >{`@${user.username}`}</span>
                            </div>
                        </div>
                        <button className=" px-4 py-2 border  rounded-full border-blue-400">Follow</button>
                    </div>
                    <div className="text-left ml:5 md:ml-14 w-11/12 truncate" >{user.bio}</div>
                </div>    
            )}
                
        </div>
    </>
}

export default InterActions
