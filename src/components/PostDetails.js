import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Post from './Post'
import GoBack from './GoBack'
import ErrorMessage from './ErrorMessage'
import {getPostDetails} from '../Actions/PostActions'

const PostDetails = (props) => {
    const dispatch = useDispatch()
    const {loading,error,post} = useSelector(state => state.postDetails)
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getPostDetails(id))
    }, [id])
    return <>
        {loading?<div>loading</div>:error?<ErrorMessage message={error.message} /> :post?
            <div>
            <GoBack title ="Thread" />
            <Post post={post} type="post" type="details" /> 
            <div>
                {post.replies.map(post => 
                    <Post key={post.id} post={post} type="reply"  />    
                )}
            </div>
        </div>:null}
    </>
}

export default PostDetails
