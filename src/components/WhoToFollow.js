import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSuggetions,relation } from '../Actions/userActions'
import {FOLLOW_USER} from '../Constants/userConstants'
const WhoToFollow = () => {
    const {users} =useSelector(state => state.suggetions)
    const dispatch = useDispatch()
    const {newRelation} = useSelector(state => state.makeRelation)
    const handleMakeRelation = (username) =>{
        dispatch(relation(username,"follow"))
        dispatch({type:FOLLOW_USER,payload:username})
    }
    useEffect(() => {
        dispatch(getSuggetions())
    }, [])
    return <>
        <div  className="mt-2 mx-1 p-2 rounded-2xl bg-gray-100 ">
                <h2 className="text-lg font-bold  border-b p-1"  >Who to follow</h2>
                {users&&users.slice(0,3).map(user => 
                    <div className="flex items-center p-2 justify-between border-b">
                        <div className="flex items-center p-2 w-3/4">
                            <img className="w-12 h-12 rounded-full" 
                            src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${user.personal_image}`} alt="profile" />
                            <div className="flex flex-col ml-2 w-3/4" >
                                <Link className="text-lg font-medium truncate w-full" to={`/profile/${user.username}`}>
                                    {`${user.first_name} ${user.last_name}`}
                                </Link>
                                <span>{`@${user.username}`}</span>
                            </div>
                        </div>
                        <button onClick={()=>handleMakeRelation(user.username)}className="mr-3 px-6 py-2 border  
                        rounded-full border-blue-400 hover:bg-blue-400 hover:text-white">Follow</button>
                    </div>    
                )}
                <Link to="/connect" className=" text-blue-400 font-semibold"  >See More</Link>
        </div>
    </>
}

export default WhoToFollow
