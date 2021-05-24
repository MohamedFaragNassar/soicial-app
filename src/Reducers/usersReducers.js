import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS
    ,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_LOGOUT
    ,USER_DETAILS_SUCCESS,USER_DETAILS_REQUEST,USER_DETAILS_FAIL
    ,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_FAIL
    ,UPDATE_PERSONAL_IMAGE_SUCCESS,UPDATE_PERSONAL_IMAGE_REQUEST,UPDATE_PERSONAL_IMAGE_FAIL,
    VISIT_PROFILE_SUCCESS,VISIT_PROFILE_REQUEST,VISIT_PROFILE_FAIL,
    GET_NOTIFICATIONS_FAIL,GET_NOTIFICATIONS_REQUEST,GET_NOTIFICATIONS_SUCCESS,
    CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,
    UPDATE_INFO_FAIL,UPDATE_INFO_REQUEST,UPDATE_INFO_SUCCESS,READ,
    GET_BLOCKS_FAIL,GET_BLOCKS_REQUEST,GET_BLOCKS_SUCCESS,FOLLOW_USER,
    SEARCH_USERS_FAIL,SEARCH_USERS_REQUEST,SEARCH_USERS_SUCCESS,REQUEST_RESPONSE,
    GET_SUGGETIONS_FAIL,GET_SUGGETIONS_REQUEST,GET_SUGGETIONS_SUCCESS,
    GET_ROOMS_FAIL,GET_ROOMS_REQUEST,GET_ROOMS_SUCCESS,REMOVE_BLOCK,
    ACCESS_ROOM_FAIL,ACCESS_ROOM_REQUEST,ACCESS_ROOM_SUCCESS,UPDATE_PROFILE,
    GET_FOLLOW_NOTIFICATIONS_FAIL,GET_FOLLOW_NOTIFICATIONS_REQUEST,GET_FOLLOW_NOTIFICATIONS_SUCCESS,
    ADD_RELATION_SUCCESS,ADD_RELATION_REQUEST,ADD_RELATION_FAIL,
CHANGE_PRIVACY,CHANGE_MESSAGES_PRIVACY, READ_FOLLOW} from '../Constants/userConstants'

const loginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false,userData:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT :
            return {}   
        default:
            return state    
    }
}

const registerReducer = (state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,registeredUser:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const profileReducer = (state={},action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true}
        case USER_DETAILS_SUCCESS:
            return {loading:false,profile:action.payload}
        case USER_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        case UPDATE_PROFILE :
            return {profile:{...state.profile,
                first_name:action.payload.first_name?action.payload.first_name:state.profile.first_name,
                last_name:action.payload.last_name?action.payload.last_name:state.profile.last_name,
                location:action.payload.location?action.payload.location:state.profile.location,
                bio:action.payload.bio?action.payload.bio:state.profile.bio,
                website:action.payload.website?action.payload.website:state.profile.website,
                
            }}
        case CHANGE_PRIVACY:
            return {profile:{...state.profile,is_private:!state.profile.is_private}}  
        case CHANGE_MESSAGES_PRIVACY:
            return {profile:{...state.profile,public_messages:!state.profile.public_messages}}  
        default:
            return state 
    }
}

const updateProfileReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return {loading:true}
        case UPDATE_PROFILE_SUCCESS:
            return {loading:false,updatedProfile:action.payload}
        case UPDATE_PROFILE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const updatePersonalImageReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PERSONAL_IMAGE_REQUEST:
            return {loading:true}
        case UPDATE_PERSONAL_IMAGE_SUCCESS:
            return {loading:false,image:action.payload}
        case UPDATE_PERSONAL_IMAGE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const visitProfileReducer = (state={},action)=>{
    switch(action.type){
        case VISIT_PROFILE_REQUEST:
            return {loading:true}
        case VISIT_PROFILE_SUCCESS:
            return {loading:false,visitedProfile:action.payload}
        case VISIT_PROFILE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getNotificationsReducer = (state={},action)=>{
    switch(action.type){
        case GET_NOTIFICATIONS_REQUEST:
            return {loading:true}
        case GET_NOTIFICATIONS_SUCCESS:
            return {loading:false,notifications:action.payload}
        case GET_NOTIFICATIONS_FAIL:
            return {loading:false,error:action.payload} 
        case READ:
           /*  const modified = state.notifications.forEach(e => {
                if(e.id == action.payload){
                    e.is_read = true
                }
            }) */
            return{notifications:state.notifications.map(e => {
                if(e.id == action.payload){
                    e.is_read = true
                    return e
                }else{
                    return e
                }
            })}
        default:
            return state 
    }
}

const  changePasswordReducer = (state={},action)=>{
    switch(action.type){
        case CHANGE_PASSWORD_REQUEST:
            return {loading:true}
        case CHANGE_PASSWORD_SUCCESS:
            return {loading:false,data:action.payload}
        case CHANGE_PASSWORD_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  updateInfoReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_INFO_REQUEST:
            return {loading:true}
        case UPDATE_INFO_SUCCESS:
            return {loading:false,data:action.payload}
        case UPDATE_INFO_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  getBlocksReducer = (state={},action)=>{
    switch(action.type){
        case GET_BLOCKS_REQUEST:
            return {loading:true}
        case GET_BLOCKS_SUCCESS:
            return {loading:false,blocks:action.payload}
        case GET_BLOCKS_FAIL:
            return {loading:false,error:action.payload}
        case REMOVE_BLOCK:
            return {blocks:state.blocks.filter(e => e.username != action.payload)} 
        default:
            return state 
    }
}

const  searchUsersReducer = (state={},action)=>{
    switch(action.type){
        case SEARCH_USERS_REQUEST:
            return {loading:true}
        case SEARCH_USERS_SUCCESS:
            return {loading:false,users:action.payload}
        case SEARCH_USERS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  getSuggestionsReducer = (state={},action)=>{
    switch(action.type){
        case GET_SUGGETIONS_REQUEST:
            return {loading:true}
        case GET_SUGGETIONS_SUCCESS:
            return {loading:false,users:action.payload}
        case GET_SUGGETIONS_FAIL:
            return {loading:false,error:action.payload}
        case FOLLOW_USER :
            const newUsers = state.users.filter(e => e.username != action.payload)
            return {users:[...newUsers]} 
        default:
            return state 
    }
}

const  getRoomsReducer = (state={},action)=>{
    switch(action.type){
        case GET_ROOMS_REQUEST:
            return {loading:true}
        case GET_ROOMS_SUCCESS:
            return {loading:false,rooms:action.payload}
        case GET_ROOMS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  accessRoomReducer = (state={},action)=>{
    switch(action.type){
        case ACCESS_ROOM_REQUEST:
            return {loading:true}
        case ACCESS_ROOM_SUCCESS:
            return {loading:false,room:action.payload}
        case ACCESS_ROOM_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}
const  getFollowNotificationsReducer = (state={},action)=>{
    switch(action.type){
        case GET_FOLLOW_NOTIFICATIONS_REQUEST:
            return {loading:true}
        case GET_FOLLOW_NOTIFICATIONS_SUCCESS:
            return {loading:false,followNotifications:action.payload}
        case READ_FOLLOW:
            const modified = state.followNotifications.forEach(e => {
                if(e.id == action.payload){
                    e.is_read = true
                }
            })
            return{followNotifications:modified}
        case REQUEST_RESPONSE:
            return {followNotifications:[...state.followNotifications.filter(e => e.user.username != action.payload)]}
        case GET_FOLLOW_NOTIFICATIONS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  makeRelationReducer = (state={},action)=>{
    switch(action.type){
        case ADD_RELATION_REQUEST:
            return {loading:true}
        case ADD_RELATION_SUCCESS:
            return {loading:false,newRelation:action.payload}
        case ADD_RELATION_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}


export {loginReducer,registerReducer,profileReducer,updateProfileReducer,updatePersonalImageReducer,
        visitProfileReducer,getNotificationsReducer,changePasswordReducer,updateInfoReducer,getBlocksReducer,
        searchUsersReducer,getSuggestionsReducer,getRoomsReducer,accessRoomReducer,getFollowNotificationsReducer,
        makeRelationReducer,}