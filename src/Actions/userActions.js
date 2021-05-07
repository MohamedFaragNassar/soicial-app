import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT
        ,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS
    ,USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,
    UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,
    UPDATE_COVER_IMAGE_FAIL,UPDATE_COVER_IMAGE_REQUEST,UPDATE_COVER_IMAGE_SUCCESS,
    UPDATE_PERSONAL_IMAGE_FAIL,UPDATE_PERSONAL_IMAGE_REQUEST,UPDATE_PERSONAL_IMAGE_SUCCESS,
    VISIT_PROFILE_SUCCESS,VISIT_PROFILE_REQUEST,VISIT_PROFILE_FAIL,
    GET_NOTIFICATIONS_FAIL,GET_NOTIFICATIONS_REQUEST,GET_NOTIFICATIONS_SUCCESS,
    CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,
    UPDATE_INFO_FAIL,UPDATE_INFO_REQUEST,UPDATE_INFO_SUCCESS,
    GET_BLOCKS_FAIL,GET_BLOCKS_REQUEST,GET_BLOCKS_SUCCESS,
    SEARCH_USERS_FAIL,SEARCH_USERS_REQUEST,SEARCH_USERS_SUCCESS,
    GET_SUGGETIONS_FAIL,GET_SUGGETIONS_REQUEST,GET_SUGGETIONS_SUCCESS,
    GET_ROOMS_FAIL,GET_ROOMS_REQUEST,GET_ROOMS_SUCCESS,READ,
    ACCESS_ROOM_FAIL,ACCESS_ROOM_REQUEST,ACCESS_ROOM_SUCCESS,READ_FOLLOW,
    GET_FOLLOW_NOTIFICATIONS_FAIL,GET_FOLLOW_NOTIFICATIONS_REQUEST,GET_FOLLOW_NOTIFICATIONS_SUCCESS,
    MAKE_RELATION,REMOVE_BLOCK,UPDATE_PROFILE,CHANGE_PRIVACY,CHANGE_MESSAGES_PRIVACY,
    ADD_RELATION_FAIL,ADD_RELATION_REQUEST,ADD_RELATION_SUCCESS} from '../Constants/userConstants'

import Axios from "axios"

const login = (username,password) => async (dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})

        const {data} = await Axios.post("/users/login",{username,password})
        localStorage.setItem("userdata",JSON.stringify(data))
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:USER_LOGIN_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]][0]})
    }
}

const register = (user) => async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        const {data} = await Axios.post("/users/register",user)
        localStorage.setItem("userdata",JSON.stringify(data))
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:USER_REGISTER_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]][0]})
    }
}

const logout = () => (dispatch) =>{
    localStorage.removeItem("userdata")
    dispatch({type:USER_LOGOUT})
    window.location.href="/welcome"
}

const getProfile = () => async(dispatch,getState) =>{
    dispatch({type:USER_DETAILS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get("/users/profile",{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:USER_DETAILS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const updateProfile = (updatedData) => async(dispatch,getState) =>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("/users/update",updatedData,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
        dispatch({type:UPDATE_PROFILE,payload:updatedData})
    }catch(err){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}


const updatePersonalImage = (image) => async(dispatch,getState)=>{
    dispatch({type:UPDATE_PERSONAL_IMAGE_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.post("/users/uploadpersonal",image,{
            headers:{
                "Authorization":`Token ${userData.token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch({type:UPDATE_PERSONAL_IMAGE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:UPDATE_PERSONAL_IMAGE_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}


const updateCoverImage = (image) => async(dispatch,getState)=>{
    dispatch({type:UPDATE_COVER_IMAGE_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.post("/users/uploadcover",image,{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:UPDATE_COVER_IMAGE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:UPDATE_COVER_IMAGE_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const relation = (username,action) => async (dispatch,getState) => {
    dispatch({type: ADD_RELATION_REQUEST})
    try{

        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.post("/users/relation",{username,action},{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        if(data.success){
            dispatch({type: ADD_RELATION_SUCCESS,payload:data})
            if(action==="unblock"){
                dispatch({type:REMOVE_BLOCK,payload:username})
            }
        }

    }catch(error){
        dispatch({type: ADD_RELATION_FAIL,payload:error.response.data[Object.keys(error.response.data)[0]]})

    }
}

const getUserProfile = (username) =>  async (dispatch,getState) => {
    dispatch({type:VISIT_PROFILE_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get(`/api/profile/${username}`,{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:VISIT_PROFILE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:VISIT_PROFILE_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const changePrivacy = (privacy) => async(dispatch,getState)=>{
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.post("/users/privacy",privacy,{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        if(privacy.action == "private"){
            dispatch({type:CHANGE_PRIVACY})
        }else{
            dispatch({type:CHANGE_MESSAGES_PRIVACY})
        }
    }catch(err){
        console.log(err)
    }
}

const getNotifications = () => async(dispatch,getState) =>{
    dispatch({type:GET_NOTIFICATIONS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get("/api/notifications",{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:GET_NOTIFICATIONS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_NOTIFICATIONS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const changePassword = (password,current) => async(dispatch,getState) =>{
    dispatch({type:CHANGE_PASSWORD_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("/users/changepassword",{password,current},{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        localStorage.setItem("userdata",JSON.stringify(data))
        dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:CHANGE_PASSWORD_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const updateInfo = (info) => async(dispatch,getState) =>{
    dispatch({type:UPDATE_INFO_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("/users/updateinfo",info,{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        localStorage.setItem("userdata",JSON.stringify(data))
        dispatch({type:UPDATE_INFO_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:UPDATE_INFO_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const readNotification = (id,action) => async(dispatch,getState) =>{
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("/api/notifications/read",{id,action},{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:READ,payload:id})
    }catch(err){
        console.log(err)
    }
}

const readFollowNotification = (id,action) => async(dispatch,getState) =>{
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("/users/notifications/read",{id,action},{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:READ_FOLLOW,payload:id})
    }catch(err){
        console.log(err)
    }
}

const getBlocks = () => async(dispatch,getState) => {
    dispatch({type:GET_BLOCKS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get("/users/getblocks",{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        dispatch({type:GET_BLOCKS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_BLOCKS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const searchUsers = (keyword)=>async(dispatch,getState)=>{
    dispatch({type:SEARCH_USERS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get(`/users/search/${keyword}`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:SEARCH_USERS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:SEARCH_USERS_FAIL,payload:err})
    }
}

const getSuggetions = () => async(dispatch,getState) => {
    dispatch({type:GET_SUGGETIONS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get(`/users/suggest`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_SUGGETIONS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_SUGGETIONS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const getRooms = () => async(dispatch,getState) => {
    dispatch({type:GET_ROOMS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get(`/chat/rooms`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_ROOMS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_ROOMS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const accessRooms = (id) => async(dispatch,getState) => {
    dispatch({type:ACCESS_ROOM_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.post(`/chat/`,{id},{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:ACCESS_ROOM_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:ACCESS_ROOM_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}


const getFollowNotifications = () => async(dispatch,getState) => {
    dispatch({type:GET_FOLLOW_NOTIFICATIONS_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.get(`/users/notifications`,{
            headers:{
                "Authorization":`Token ${userData.token}`
            }
        })
        dispatch({type:GET_FOLLOW_NOTIFICATIONS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_FOLLOW_NOTIFICATIONS_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}



export {login,register,logout,getProfile,updateProfile,updateCoverImage
        ,updatePersonalImage,relation,getUserProfile,changePrivacy,
        getNotifications,readNotification,changePassword,updateInfo,
        getBlocks,searchUsers,getSuggetions,getRooms,accessRooms,
        getFollowNotifications,readFollowNotification}