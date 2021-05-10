import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {getPosts} from '../Actions/PostActions'
import Post from './Post';


const MyTweets = () => {
    
    const {posts} = useSelector(state => state.getPosts)
    const [page,setPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getPosts("mytweets",page))
    }, [page])

    return <>
    <div className="h-auto  bg-gray-200 pt-2" >
            {posts&&posts.results.map(post => 
            <Post key={uuidv4()} post={post} type="post" />    
                )}
        {posts?.next&&<button onClick={()=>setPage(page+1)} className="w-full h-10 bg-blue-50 hover:bg-blue-100 mb-2">
            Load More
        </button>}
    </div>
    </>
}

export default MyTweets
