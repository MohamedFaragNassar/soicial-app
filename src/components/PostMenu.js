import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deletePost,postAction} from '../Actions/PostActions'
import {relation} from '../Actions/userActions'

const PostMenu = ({node,post,close}) => {

    const {userData} = useSelector(state => state.userSignIn)
    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.profileDetails)
    const checkOwner = userData.user.id == post.user.id
    const checkFollowing = profile&&profile.following.filter(e => e.id == post.user.id).length < 1 
    const checkBookmark = profile&&profile.bookmarks.includes(post.id)
    
    const handleDeletePost =(id) => {
        dispatch(deletePost(id))
        close()
    }

    const handleMakeRelation = (action) => {
        dispatch(relation(post.user.username,action))
        close()

    }

    const handleBookMark = (action) => {
        dispatch(postAction(action,post.id))
        close()

    }

{/* <i class="fas fa-user-minus"></i> */}
    return (
        <div ref={node} id={`post-${post.id}`}  className=" w-52 flex flex-col items-center bg-white shadow-md py-2
            absolute top-1 right-2 shadow-xl rounded-lg z-50 bg-gray-100" >
            {!checkOwner ? checkFollowing?
                <div onClick={()=>handleMakeRelation("follow")}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer  " >
                    <i className="fas fa-user-plus"></i>
                    <span className="w-3/4 text-left" >{`follow @${post.user.username}`}</span>
                </div> : 
                <div onClick={()=>handleMakeRelation("unfollow")}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer  " >
                    <i className="fas fa-user-minus"></i>
                <span className="w-3/4 text-left" >{`unfollow @${post.user.username}`}</span>
            </div> :null}
            {checkBookmark ? 
                <div onClick={()=>handleBookMark("unbookmark")} 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer "  >
                    <i className="fas fa-bookmark"></i>
                    <span className="w-3/4 text-left">Remove</span>
                </div> : 
                <div onClick={()=>handleBookMark("bookmark")} 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer "  >
                    <i className="fas fa-bookmark"></i>
                    <span className="w-3/4 text-left">bookmark</span>
                </div>
            }
            {checkOwner?<div className="w-full flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer " 
                            onClick={()=>handleDeletePost(post.id)} >
                <i className="fas fa-trash-alt"></i>
                <span className="w-3/4 text-left" >delete</span>
            </div>:null}
            {!checkOwner&&<div className="w-full flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer "  
            onClick={()=>handleMakeRelation("block")}>
                <i className="fas fa-ban"></i>
                <span className="w-3/4 text-left" >{`block @${post.user.username}`}</span>
            </div>}
        </div>
    )
}

export default PostMenu
