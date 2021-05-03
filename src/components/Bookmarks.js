import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import {clearBookmarks,getBookmarks} from '../Actions/PostActions'
import {CLEAR_BOOKMARKS} from '../Constants/PostConstants'
import Post from './Post'

const Bookmarks = () => {

    const {loading,error,allBookmarks} = useSelector(state => state.getBookMarks)
    
    const {profile} = useSelector(state => state.profileDetails)

    const dispatch = useDispatch()
    
    const handleClearBookmars = () => {
        dispatch(clearBookmarks())
        dispatch({type:CLEAR_BOOKMARKS})
    }

    console.log(profile)

    useEffect(()=>{
        dispatch(getBookmarks())
    },[])
   
    return <>
        {loading ? <div>loading</div> : error ? <ErrorMessage message={error.message} /> : allBookmarks ?
            <div>
            <div className="flex items-center justify-between p-2" >
                <div className="flex flex-col items-center" >
                    <div className="text-xl font-bold" >Bookmarks</div>
                    {profile&&<span className="text-gray-400">{`@${profile.username}`}</span>} 
                </div>
                <button onClick={handleClearBookmars}
                    className="px-6 py-2 border rounded-full border-blue-400" >
                    Clear Bookmarks
                </button>
            </div>
            <div>
                {allBookmarks.map(post => 
                    <Post post={post} type="post" />    
                )}
            </div>
        </div>:null}
    </>
}

export default Bookmarks
