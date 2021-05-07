import {ADD_POST_FAIL,ADD_POST_REQUEST,ADD_POST_SUCCESS
        ,GET_POSTS_FAIL,GET_POSTS_REQUEST,GET_POSTS_SUCCESS,ADD_POST,DELETE_POST,
        GET_POST_DETAILS_FAIL,GET_POST_DETAILS_REQUEST,GET_POST_DETAILS_SUCCESS,
        POST_ACTION_FAIL,POST_ACTION_REQUEST,POST_ACTION_SUCCESS,
        DELETE_POST_FAIL,DELETE_POST_REQUEST,DELETE_POST_SUCCESS,
        GET_TAG_POSTS_FAIL,GET_TAG_POSTS_REQUEST,GET_TAG_POSTS_SUCCESS,
        GET_TAGS_FAIL,GET_TAGS_REQUEST,GET_TAGS_SUCCESS,
        DELETE_BOOKMARKS_FAIL,DELETE_BOOKMARKS_REQUEST,DELETE_BOOKMARKS_SUCCESS,CLEAR_BOOKMARKS,
        GET_BOOKMARKS_FAIL,GET_BOOKMARKS_REQUEST,GET_BOOKMARKS_SUCCESS} from '../Constants/PostConstants'
import Axios from 'axios'

const addPost = (post)=>async(dispatch,getState) =>{
    dispatch({type:ADD_POST_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.post("/api/post",post,{
            headers:{
                "Authorization":`Token ${userData.token}`,
                'Content-Type': 'application/json'
                //'Content-Type': 'multipart/form-data'
            }
        })
        dispatch({type:ADD_POST_SUCCESS,payload:data})
        dispatch({type:ADD_POST,payload:data})
        
    }catch(err){
        dispatch({type:ADD_POST_FAIL,payload:err})
    }
}

const deletePost = (id)=>async(dispatch,getState) =>{
    dispatch({type:DELETE_POST_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.post("/api/deletepost",{id},{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:DELETE_POST_SUCCESS,payload:data})
        dispatch({type:DELETE_POST,payload: id})
    }catch(err){
        dispatch({type:DELETE_POST_FAIL,payload:err})
    }
}

const getPosts = (type,page)=>async(dispatch,getState) =>{
    dispatch({type:GET_POSTS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get(`/api/posts/${type}/?page=${page}`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        console.log(data)
        dispatch({type:GET_POSTS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_POSTS_FAIL,payload:err})
    }
}

const getTagPosts = (tag)=>async(dispatch,getState) =>{
    dispatch({type:GET_TAG_POSTS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get(`/api/tag/${tag}`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_TAG_POSTS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_TAG_POSTS_FAIL,payload:err})
    }
}

const getPostDetails = (id) => async (dispatch,getState) => {
    dispatch({type:GET_POST_DETAILS_REQUEST})
    console.log(id)
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get(`/api/post/${id}`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_POST_DETAILS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_POST_DETAILS_FAIL,payload:err})
    }
}

const postAction = (action,id) => async(dispatch,getState) => {
    dispatch({type:POST_ACTION_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.post("/api/action",{action,id},{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:POST_ACTION_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:POST_ACTION_FAIL,payload:err})
    }
}

const getTags = () => async(dispatch,getState) => {
    dispatch({type:GET_TAGS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get("/api/tags",{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_TAGS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_TAGS_FAIL,payload:err})
    }
}


const clearBookmarks = () => async(dispatch,getState) => {
    dispatch({type:DELETE_BOOKMARKS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.delete("/api/bookmarks",{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:DELETE_BOOKMARKS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:DELETE_BOOKMARKS_FAIL,payload:err})
    }
}


const getBookmarks = () => async(dispatch,getState) => {
    dispatch({type:GET_BOOKMARKS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get("/api/allbookmarks",{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_BOOKMARKS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_BOOKMARKS_FAIL,payload:err})
    }
}



export {addPost,getPosts,getPostDetails,postAction,deletePost,getTagPosts,
        getTags,clearBookmarks,getBookmarks,}