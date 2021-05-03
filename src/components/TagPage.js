import React, { useEffect } from 'react'
import GoBack from './GoBack'
import Post from './Post'
import {getTagPosts} from '../Actions/PostActions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './ErrorMessage'
const TagPage = (props) => {
    const tag = props.match.params.tag
    const {loading,error,posts} = useSelector(state => state.tagPosts)

    console.log(tag)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTagPosts(tag))
    }, [tag])
    return <>
        { loading?<div>loading</div>:error?<ErrorMessage message={error.message} />: posts ?
        <div>
            <GoBack title={`#${tag}`} /> 
            {posts.map(post =>
                <Post post={post} type="post" />     
            )}
        </div>:null}
    </>
}

export default TagPage
