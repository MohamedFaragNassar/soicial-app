import React, { useEffect } from 'react'
import GoBack from '../GoBack'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {changePrivacy} from '../../Actions/userActions'

const Privacy = () => {
    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.profileDetails)
   console.log(profile)
    const handleChangePrivacy = (action,value) => {
        if(action === "private"){
            dispatch(changePrivacy({
                action,
                is_private:value
            }))
        }else{
        
            dispatch(changePrivacy({
                action,
                public_messages:value
            }))
        }
    }
    useEffect(() => {
       
    }, [profile])

    return <>
        {profile&&<div>
            <GoBack  title="Privacy"/>
            <div>
                <div className="px-2 py-4 font-semibold text-lg border-b w-full text-left flex flex-col items-center" >
                    <div className=" w-full flex justify-between items-start">
                        <span>Protect your posts</span>
                        <input checked={profile.is_private?"checked":""} 
                         onChange={(e)=>handleChangePrivacy("private",e.target.checked)}
                         type="checkbox" className="w-5 h-5" />
                    </div>
                        <span className="text-sm text-gray-400">
                            When selected, your Tweets and other account information are only visible to people who follow you
                        </span>
                </div>
               {/*  <div className="px-2 py-4 font-semibold text-lg border-b w-full text-left flex flex-col items-center" >
                    <div className=" w-full flex justify-between items-start">
                        <span>Allow message requests from everyone</span>
                        <input checked={profile.public_messages?"checked":""} 
                         onChange={(e)=>handleChangePrivacy("messages",e.target.checked)}
                         type="checkbox" className="w-5 h-5" />
                    </div>
                        <span className="text-sm text-gray-400">
                            Let people who you don’t follow send you message requests and add you to group conversations.
                            To reply to their messages, you need to accept the request.
                        </span>
                </div> */}
                <Link to="/settings/blocks" className="px-2 py-4 font-semibold text-lg border-b w-full text-left flex justify-between items-center" >
                        <span>Blocked Accounts</span>
                        <i class="fas fa-chevron-right"></i>
                </Link>
            </div>
        </div>}
    </>
}

export default Privacy
