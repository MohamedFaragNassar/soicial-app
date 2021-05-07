import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Post from './Post'
import {modifyDate} from '../helpers/helpers'
import ErrorMessage from './ErrorMessage'
import {getUserProfile,relation} from '../Actions/userActions'
import { Link, Redirect } from 'react-router-dom'
import {useClickToClose} from '../helpers/CTC'
import InterActions from './InterActions'

const VisitProfile = (props) => {
    
    const [type,setType] = useState("mytweets")
    const username = props.match.params.username
    const {userData} = useSelector(state => state.userSignIn)
    const {profile} = useSelector(state => state.profileDetails)
    const {newRelation} = useSelector(state => state.makeRelation)
    const [isUsersOpen,setIsUsersOpen] = useState(false)
    const [users,setUsers] = useState()

    const userNode = useClickToClose(()=>setIsUsersOpen(false),"#interActions")
    const {loading,error,visitedProfile} = useSelector(state => state.visitProfile)
    const dispatch = useDispatch()
    let chechFollowing
    let checkRequest 
    if(profile&&visitedProfile){
        chechFollowing = visitedProfile.userProfile.followers.filter(e => e.id == profile.id).length > 0
        checkRequest =   visitedProfile.userProfile.follow_requests.filter(e => e == profile.id).length > 0
    }

    const handleMakeRelation = (action) =>{
        dispatch(relation(username,action))
    } 

    const handelShowUsers = (users)=>{
        setUsers(users)
        setIsUsersOpen(true)
    }

    useEffect(() => {
        dispatch(getUserProfile(username))
     }, [username,newRelation])
    
    if(username === profile?.username){
        return <Redirect path="/profile" />
    }
    return <>
        {loading ? <div>loading</div> :error?<ErrorMessage message={error} /> : profile&&visitedProfile?
        <div className="w-full h-auto flex flex-col item-center justify-between bg-white" >
            <div className="relative" >
                <img className="w-full h-60 rounded-sm " 
                src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328825/${visitedProfile.userProfile.cover_image}`} />
                <div className="w-80 flex flex-col item-center justify-between  absolute top-40 left-1" >
                    <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${visitedProfile.userProfile.personal_image}`}
                     className="w-32 h-32 rounded-full border-4 border-white ml-10 " />
                    <h2 className="text-2xl font-bold ml-10" >
                        {`${visitedProfile.userProfile.first_name} ${visitedProfile.userProfile.last_name}`}
                        {visitedProfile.userProfile.is_private?<i className="fas fa-lock ml-2"></i>:null}
                    </h2>
                    <span className="mt-1.5 text-sm text-gray-600 ml-10" >{`@${visitedProfile.userProfile.username}`}</span>
                </div>
                    <div  className="absolute top-64 right-4 flex items-center justify-center " >
                        <button  className=" px-6 py-2  border-2 rounded-full border-red-600
                            font-semibold text-lg mr-2  hover:bg-red-600 hover:text-white" 
                            onClick={()=>handleMakeRelation("block")}>
                                block
                        </button>
                        {visitedProfile.userProfile.public_messages?<Link to={`/messages/${visitedProfile.userProfile.id}`} className="border-2
                         border-blue-400 rounded-full text-lg px-3 py-2  hover:bg-blue-400 hover:text-white">
                            <i className="far fa-envelope"></i>
                        </Link>:null}
                        {chechFollowing?
                            <button className=" px-6 py-2  border-2 rounded-full border-blue-400 ml-2
                            font-semibold text-lg hover:bg-blue-400 hover:text-white " onClick={()=>handleMakeRelation("unfollow")} >
                                Unfollow
                            </button>: checkRequest?
                            <button className=" px-3 py-2  border-2 rounded-full border-blue-400 ml-2
                            font-semibold text-lg hover:bg-blue-400 hover:text-white " onClick={()=>handleMakeRelation("cancel")} >
                                cancel request
                            </button>:
                            <button className=" px-6 py-2  border-2 rounded-full border-blue-400 ml-2
                            font-semibold text-lg hover:bg-blue-400 hover:text-white  " onClick={()=>handleMakeRelation("follow")} >
                                Follow
                            </button>
                        }
                    </div>
                <div className="mt-40 flex items-center justify-between w-7/12 mx-auto">
                    <div>
                        <i className="fad fa-birthday-cake mr-2"></i>
                        <span>{modifyDate(visitedProfile.userProfile.birthday)}</span>
                    </div>
                   <div>
                        <i className="fal fa-calendar-alt cake mr-2"></i>
                        <span>{`joined ${modifyDate(visitedProfile.userProfile.date_joined)}`}</span>
                   </div>
                   {visitedProfile.userProfile.location&&<div>
                        <i class="fal fa-location-circle mr-2"></i>
                        <span>{visitedProfile.userProfile.location}</span>
                    </div>}
                </div>
                {visitedProfile.userProfile.website&&<div className="mt-5 flex items-center justify-start w-7/12 mx-auto">
                    <i className="fal fa-calendar-alt cake mr-2"></i>
                    <span>{visitedProfile.userProfile.website}</span>
                </div>}
                <div className="w-full text-left p-4">{visitedProfile.userProfile.bio}</div>
                <div  className="flex items-center justify-between w-2/5 mx-auto" >
                    <button  onClick={()=>handelShowUsers(visitedProfile.userProfile.following)}>
                        <span className="cake mr-2 font-bold">{visitedProfile.userProfile.following.length}</span>
                        <span>Following </span>
                    </button>
                   <button onClick={()=>handelShowUsers(visitedProfile.userProfile.followers)}>
                        <span className="cake mr-2 font-bold">{visitedProfile.userProfile.followers.length}</span>
                        <span>Followers </span>
                   </button>
                </div>
            </div>
            <div className="w-full" >
                <div className="w-full h-16 border-b mt-5 ">
                    <button onClick={()=>setType("mytweets")}  className={`w-1/2 h-full text-xl font-bold\
                     ${type==="mytweets"?"text-blue-600 border-b-2 border-blue-600":null} `}>
                        Tweets
                    </button>
                    <button onClick={()=>setType("likes")} className={`w-1/2 h-full text-xl font-bold \
                        ${type==="likes"?"text-blue-600 border-b-2 border-blue-600":null}`} >
                        Likes
                    </button>
                </div>
            </div>
            <div className="h-auto  bg-gray-200" >
                {visitedProfile.posts.map(post => 
                    <Post post={post} type="post" />    
                )}
            </div>
        </div>:null}
        <InterActions isOpen={isUsersOpen} close={()=>setIsUsersOpen(false)} node={userNode} users={users}  />

    </>
}

export default VisitProfile
