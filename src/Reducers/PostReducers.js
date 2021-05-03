import {ADD_POST_FAIL,ADD_POST_REQUEST,ADD_POST_SUCCESS
,GET_POSTS_SUCCESS,GET_POSTS_REQUEST,GET_POSTS_FAIL,
GET_POST_DETAILS_SUCCESS,GET_POST_DETAILS_REQUEST,GET_POST_DETAILS_FAIL,
POST_ACTION_SUCCESS,POST_ACTION_REQUEST,POST_ACTION_FAIL,
DELETE_POST_SUCCESS,DELETE_POST_REQUEST,DELETE_POST_FAIL,
GET_TAG_POSTS_FAIL,GET_TAG_POSTS_REQUEST,GET_TAG_POSTS_SUCCESS,
GET_TAGS_FAIL,GET_TAGS_REQUEST,GET_TAGS_SUCCESS,ADD_POST,DELETE_POST,
DELETE_BOOKMARKS_FAIL,DELETE_BOOKMARKS_REQUEST,DELETE_BOOKMARKS_SUCCESS,CLEAR_BOOKMARKS,
GET_BOOKMARKS_FAIL,GET_BOOKMARKS_REQUEST,GET_BOOKMARKS_SUCCESS} from '../Constants/PostConstants'


const addPostReducer = (state={},action)=>{
    switch(action.type){
        case ADD_POST_REQUEST:
            return {loading:true}
        case ADD_POST_SUCCESS:
            return {loading:false,addedPost:action.payload}
        case ADD_POST_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const deletePostReducer = (state={},action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
            return {loading:true}
        case DELETE_POST_SUCCESS:
            return {loading:false,deletedPost:action.payload}
        case DELETE_POST_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getPostsReducer = (state={},action)=>{
    switch(action.type){
        case GET_POSTS_REQUEST:
            return {loading:true,posts:state.posts}
        case GET_POSTS_SUCCESS:
            try{
                let results
                console.log(state)
                if(state.posts){
                     results = [...state.posts.results,...action.payload.results]
                }else{
                    results = [...action.payload.results]
                }
                const next = action.payload.next
                return {loading:false,posts:{results,next}}

            }catch(err){
                console.log(err)
            }
        case ADD_POST:
            if(action.payload.parent){
                return state
            }else{
                return {posts:[action.payload,...state.posts]} 
            }
        case DELETE_POST:
            return {posts:state.posts.filter(e => e.id != action.payload)} 
        case GET_POSTS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getTagPostsReducer = (state={},action)=>{
    switch(action.type){
        case GET_TAG_POSTS_REQUEST:
            return {loading:true}
        case GET_TAG_POSTS_SUCCESS:
            return {loading:false,posts:action.payload}
        case GET_TAG_POSTS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getTagsReducer = (state={},action)=>{
    switch(action.type){
        case GET_TAGS_REQUEST:
            return {loading:true}
        case GET_TAGS_SUCCESS:
            return {loading:false,tags:action.payload}
        case GET_TAGS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getPostDetailsReducer = (state={},action)=>{
    switch(action.type){
        case GET_POST_DETAILS_REQUEST:
            return {loading:true}
        case GET_POST_DETAILS_SUCCESS:
            return {loading:false,post:action.payload}
        case GET_POST_DETAILS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const postActionReducer = (state={},action)=>{
    switch(action.type){
        case POST_ACTION_REQUEST:
            return {loading:true}
        case POST_ACTION_SUCCESS:
            return {loading:false,action:action.payload}
        case POST_ACTION_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const clearBookmarksReducer = (state={},action)=>{
    switch(action.type){
        case DELETE_BOOKMARKS_REQUEST:
            return {loading:true}
        case DELETE_BOOKMARKS_SUCCESS:
            return {loading:false,bookmarks:action.payload}
        case DELETE_BOOKMARKS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getBookMarksReducer = (state={},action)=>{
    switch(action.type){
        case GET_BOOKMARKS_REQUEST:
            return {loading:true}
        case GET_BOOKMARKS_SUCCESS:
            return {loading:false,allBookmarks:action.payload}
        case GET_BOOKMARKS_FAIL:
            return {loading:false,error:action.payload} 
        case CLEAR_BOOKMARKS:
            return {loading:false,allBookmarks:[]}
        default:
            return state 
    }
}

export {addPostReducer,getPostsReducer,getPostDetailsReducer,postActionReducer,deletePostReducer
        ,getTagPostsReducer,getTagsReducer,clearBookmarksReducer,getBookMarksReducer,}