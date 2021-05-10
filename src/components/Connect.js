import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import GoBack from './GoBack'
import {getSuggetions, relation} from '../Actions/userActions'
import {useDispatch,useSelector} from 'react-redux'
import { FOLLOW_USER } from '../Constants/userConstants'

const Connect = () => {
    
    const {users} =useSelector(state => state.suggetions)
    const dispatch = useDispatch()

    const handleMakeRelation = (username) =>{
        dispatch(relation(username,"follow"))
        dispatch({type:FOLLOW_USER,payload:username})
    }
    
    useEffect(() => {
       if(!users){
           dispatch(getSuggetions())
       }
    }, [])
    return (
        <div>
            <GoBack title="Connect"/>
            <div>
                {users&&users.map(user => 
                    <div className="flex flex-col items-center p-2 bg-white  justify-between border-b">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-center" >
                                <img className="w-12 h-12 rounded-full"
                                 src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${user.personal_image}`} alt="profile" />
                                <div className="flex flex-col items-start ml-2" >
                                    <Link className="text-lg font-medium" to={`/profile/${user.username}`}>
                                        {`${user.first_name} ${user.last_name}`}
                                    </Link>
                                    <span className="text-gray-400" >{`@${user.username}`}</span>
                                </div>
                            </div>
                            <button onClick={()=>handleMakeRelation(user.username)} 
                            className=" px-6 py-2 border  rounded-full border-blue-400 
                            hover:bg-blue-400 hover:text-white">Follow</button>
                        </div>
                        <div className="text-left ml-14" >{user.bio}</div>
                    </div>    
                )}
            </div>
            
        </div>
    )
}

export default Connect
