import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Post from './Post'
import EditProfile from '../components/EditProfile'
import {useClickToClose} from '../helpers/CTC'
import {getPosts,getLikedPosts} from '../Actions/PostActions'
import ErrorMessage from './ErrorMessage'
import {modifyDate} from '../helpers/helpers'
import InterActions from './InterActions'
import Spinner from './Spinner'
import { v4 as uuidv4 } from 'uuid';
import MyTweets from './MyTweets'
import LikedTweets from './LikedTweets'

const Profile = () => {

    const [type,setType] = useState("mytweets")
    const [isOpen,setIsOpen] = useState(false)
    const [isUsersOpen,setIsUsersOpen] = useState(false)
    const [users,setUsers] = useState()
    const [page,setPage] = useState(1)
    
    const domNode = useClickToClose(()=>setIsOpen(false), "#edit-profile" )
    const userNode = useClickToClose(()=>setIsUsersOpen(false),"#interActions")

    const dispatch = useDispatch()

    const {loading,error,profile} = useSelector(state => state.profileDetails)
    
    const {posts} = useSelector(state => state.getPosts)

    const handelShowUsers = (users)=>{
        setUsers(users)
        setIsUsersOpen(true)
    }
 
    return <>
        {loading ? <Spinner /> :error?<ErrorMessage message={error} /> : profile?
        <div className="w-full h-auto flex flex-col item-center justify-between bg-white" >
            <div className="relative" >
                <img className="w-full h-60 rounded-sm "
                 src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328825/${profile.cover_image}`} />
                <div className="w-80 flex flex-col item-center justify-between  absolute top-40 left-1" >
                    <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${profile.personal_image}`}
                    className="w-32 h-32 rounded-full border-4 border-white ml-10 " />
                    <h2 className=" text-xl font-semibold ml-4 md:text-2xl md:font-bold md:ml-10" >
                        {`${profile.first_name} ${profile.last_name}`} 
                        {profile.is_private?<i className="fas fa-lock ml-2"></i>:null}
                    </h2>
                    <span className="mt-1.5 text-sm text-gray-600 ml-10" >{`@${profile.username}`}</span>
                </div>
                <button className="absolute top-64 right-1 px-3 py-1  md:top-64 md:right-8 md:px-6 md:py-3 font-semibold text-lg border-2
                    rounded-full border-blue-400 hover:bg-blue-400 hover:text-white" onClick={()=>setIsOpen(true)}  >
                       Edit Profile
                </button>
                <div className="mt-40 flex items-center justify-between w-10/12 md:w-7/12 mx-auto flex-wrap">
                   {profile.birthday&& <div>
                        <i className="fad fa-birthday-cake mr-2"></i>
                        <span>{modifyDate(profile.birthday)}</span>
                    </div>}
                   <div>
                        <i className="fal fa-calendar-alt cake mr-2"></i>
                        <span>{`joined ${modifyDate(profile.date_joined)}`}</span>
                   </div>
                   {profile.location&&<div>
                        <i className = "fal fa-location-circle mr-2"></i>
                        <span>{profile.location}</span>
                    </div>}
                </div>
                {profile.website&&<div className="mt-5 flex items-center justify-start w-7/12 mx-auto">
                    <i className="fal fa-calendar-alt cake mr-2"></i>
                    <span>{profile.website}</span>
                </div>}
                <div className="w-full text-left p-4">{profile.bio}</div>
                <div  className="flex items-center justify-between w-8/12 md:w-2/5 mx-auto" >
                    <button onClick={()=>handelShowUsers(profile.following)} className="focus:outline-none">
                        <span className="cake mr-2 font-bold">{profile.following.length}</span>
                        <span>Following </span>
                    </button>
                   <button onClick={()=>handelShowUsers(profile.followers)} className="focus:outline-none">
                        <span className="cake mr-2 font-bold">{profile.followers.length}</span>
                        <span>Followers </span>
                   </button>
                </div>
            </div>
            <div className="w-full" >
                <div className="w-full h-16 border-b mt-5 ">
                    <button onClick={()=>setType("mytweets")}  className={`w-1/2 h-full text-xl font-bold\
                     ${type==="mytweets"?"text-blue-600 border-b-2 border-blue-600":null} focus:outline-none  `}>
                        Tweets
                    </button>
                    <button onClick={()=>setType("likes")} className={`w-1/2 h-full text-xl font-bold \
                        ${type==="likes"?"text-blue-600 border-b-2 border-blue-600":null} focus:outline-none `} >
                        Likes
                    </button>
                </div>
            </div>
            {type=="mytweets"?<MyTweets /> : <LikedTweets />}
        </div>:null}
        <InterActions isOpen={isUsersOpen} close={()=>setIsUsersOpen(false)} node={userNode} users={users}  />
       {profile&& <EditProfile isOpen={isOpen} close={()=>setIsOpen(false)} domNode={domNode} user={profile} />}
    </>
}

export default Profile
