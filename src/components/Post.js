import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostMenu from './PostMenu'
import {useClickToClose} from '../helpers/CTC'
import AddReply from './AddReply'
import InterActions from './InterActions'
import { useDispatch, useSelector } from 'react-redux'
import {postAction} from '../Actions/PostActions'

const Post = ({post,type}) => {
    
    const {userData} = useSelector(state => state.userSignIn)
    const [isOpen,setIsOpen] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [checkLike,setCheckLike] = useState(post.likes.filter(item => item.id == userData.user.id).length > 0)
    const [checkShare,setCheckShare] = useState(post.shares.filter(item => item.id == userData.user.id).length > 0)
    const [isInterActionsOpen,setIsInterActionsOpen] = useState(false)
    const [interActingUsers,setInterActingUsers] = useState([])


    const checkUser = userData.user.id == post.user.id
    
    
   
    const dispatch = useDispatch()


    const handlePostAction = (action) =>{
        console.log(action)
        dispatch(postAction(action,post.id))
        switch (action){
            case "like":
                 post.likes = [...post.likes,userData.user]
                 return setCheckLike(true)
            case "unlike":
                post.likes = post.likes.filter(user => user.id != userData.user.id)
                return setCheckLike(false)
            case "share":
                post.shares = [...post.shares,userData.user]
                return setCheckShare(true)
            case "unshare":
                post.shares = post.shares.filter(user => user.id != userData.user.id)
                return setCheckShare(false)
            default:
                return
        }
    }

    const handleOpenInteractions = (users) => {
        setInterActingUsers(users)
        setIsInterActionsOpen(true)
    }

    const node = useClickToClose(()=>setIsMenuOpen(false),`#post-${post&&post.id}`)

    const addReplyNode = useClickToClose(()=>setIsOpen(false),"#addReply")
    const interActionsNode = useClickToClose(()=>setIsInterActionsOpen(false),"#interActions")

    

    useEffect(() => {
       
    }, [checkLike,checkShare])


   const classes = type==="post" ? "p-2  flex flex-col items-center justify-between mx-auto mb-2 relative\
                            rounded-lg bg-white h-auto shadow-md " : type==="reply"?
                            "p-2  flex flex-col items-center justify-between mx-auto  relative\
                             rounded-sm bg-white h-auto border-b last:mb-2 " :
                             "p-2  flex flex-col items-center justify-between mx-auto  relative\
                             rounded-sm bg-white h-auto  font-semibold"
    return <>
        {post&&<div  className={classes} style={type==="post"?{width:98+"%"}:{width:100+"%"}} >
            <div className=" w-full flex items-start justify-between">
               <div className=" flex items-start justify-center  " >
                    <img className=" w-10 h-10 md:w-12 md:h-12 rounded-full" 
                    src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${post.user.personal_image}`} />
                    <Link className=" ml-2 md:ml-3 text-lg md:text-xl mt-.5 font-medium md:font-semibold truncate" 
                    to={checkUser?"/profile":`/profile/${post.user.username}`} >
                        {`${post.user.first_name} ${post.user.last_name}`}
                    </Link>
                    <span className="ml-2 mt-1.5 text-sm text-gray-400" >{`@${post.user.username}`}</span>
               </div>
               <button onClick={(e)=>setIsMenuOpen(true)} className="mr-2 px-2 " >
                    <i className="far fa-ellipsis-v-alt"></i>
               </button>
            </div>
            <Link to={`/post/${post.id}`} className="w-full p-2 h-auto text-left break-all " >{post.content}</Link>
            <div className="w-full ml-5 flex items-center justify-start flex-wrap mb-2 break-words break-all" >
                {post.tags.map(tag => 
                    <Link to={`/tag/${tag}`} className="ml-2 text-blue-800" >{`#${tag}`}</Link>    
                )}
            </div>
            {post.image.length >0 ? <img className="w-full mx-auto rounded-lg max-h-80" 
            src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328410/${post.image}`} /> :null}
           { type!=="details"? <div className=" w-full flex items-center justify-evenly " >
                <div className="flex items-center justify-center mt-2">
                    <button onClick={()=>setIsOpen(true)} className="mr-2 text-sm md:text-lg text-gray-600" >
                        <i className="fal fa-comment"></i>
                    </button>
                    <span className="text-sm" >{post.replies.length}</span>
                </div>
                <div className="flex items-center justify-center" >
                    {!checkShare?<button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("share")} >
                        <i className="fal fa-share-alt-square"></i>
                    </button>:
                    <button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("unshare")} >
                        <i className="fas fa-share-alt-square text-green-500"></i>
                    </button>}
                    <span className="text-sm">{post.shares.length}</span>
                </div>
                <div className="flex items-center justify-center" >
                    {!checkLike?<button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("like")} >
                        <i className="far fa-heart"></i>
                    </button>:
                    <button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("unlike")} >
                        <i className="fas fa-heart text-red-500"></i>
                    </button>}
                    <span className="text-sm">{post.likes.length}</span>
                </div>
            </div> : 
            <div className="w-full" >
                    <div className="w-full border-b border-t py-2 mt-4 flex items-center justify-start " >
                        {post.shares.length?<button onClick={()=>handleOpenInteractions(post.shares)} >
                            {`${post.shares.length} Retweets`}
                        </button>:<span>0 shares</span>}
                        {post.likes.length?<button onClick={()=>handleOpenInteractions(post.likes)} className="ml-8">
                            {`${post.likes.length} Likes`}
                        </button>:<span className="ml-5">0 Likes</span>}
                    </div>
                    <div className="w-full border-b  py-2 flex items-center justify-evenly " >
                    <div className="flex items-center justify-center mt-2" >
                    <button onClick={()=>setIsOpen(true)} className="mr-2 text-sm md:text-lg text-gray-600" >
                        <i className="fal fa-comment"></i>
                    </button>
                    
                </div>
                <div className="flex items-center justify-center" >
                        {!checkShare?<button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("share")} >
                                <i className="fal fa-share-alt-square"></i>
                            </button>:
                            <button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("unshare")} >
                                <i className="fas fa-share-alt-square text-green-500"></i>
                            </button>}
                         </div>
                        <div className="flex items-center justify-center" >
                            {!checkLike?<button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("like")} >
                                <i className="far fa-heart"></i>
                            </button>:
                            <button  className="mr-2 text-sm md:text-lg text-gray-600" onClick={()=>handlePostAction("unlike")} >
                                <i className="fas fa-heart text-red-500"></i>
                            </button>}
                        </div>
                    </div>
            </div>
            }
           {isMenuOpen&& <PostMenu post={post} node={node} close={()=>setIsMenuOpen(false)} />}
            <AddReply post={post} isOpen={isOpen} close={()=>setIsOpen(false)} node={addReplyNode} />
            <InterActions isOpen={isInterActionsOpen} close={()=>setIsInterActionsOpen(false)}
             node={interActionsNode} users={interActingUsers}/>
        </div>}
    </>
}

export default Post
