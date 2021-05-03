import React, { useEffect } from 'react'
import GoBack from '../GoBack'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getBlocks,relation} from '../../Actions/userActions'
import ErrorMessage from '../ErrorMessage'
const BlockedAccounts = () => {

    const dispatch = useDispatch()
    const {loading,error,blocks} = useSelector(state => state.getBlocks)
    
    const handleUnblock = (username)=>{
        dispatch(relation(username,"unblock"))
    }
    
    useEffect(() => {
       dispatch(getBlocks())
    }, [])
    return <>
        {loading?<div>loading</div>:error?<ErrorMessage message={error.message}/> : blocks ?
        <div>
            <GoBack title="Blocked Accounts" />
            <div>
                {blocks.map(user => 
                    <div className="flex flex-col items-center p-2 bg-white  justify-between border-b">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-center" >
                                <img className="w-12 h-12 rounded-full" src="./profile.jpg" alt="profile" />
                                <div className="flex flex-col items-start ml-2" >
                                    <Link className="text-lg font-medium" to="/" >{`${user.first_name} ${user.last_name}`}</Link>
                                    <span className="text-gray-400" >{`@${user.username}`}</span>
                                </div>
                            </div>
                            <button onClick={()=>handleUnblock(user.username)}  
                            className=" px-6 py-2 border border rounded-full border-blue-400">unblock</button>
                        </div>
                    </div>    
                )}
            </div>
        </div>:null}
    </>
}

export default BlockedAccounts
