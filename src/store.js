import thunk from 'redux-thunk'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {loginReducer,registerReducer,profileReducer,updateProfileReducer
    ,updatePersonalImageReducer,
    visitProfileReducer,changePasswordReducer,updateInfoReducer,getRoomsReducer,
    getNotificationsReducer,getBlocksReducer,searchUsersReducer, getSuggestionsReducer,
    accessRoomReducer,getFollowNotificationsReducer,makeRelationReducer} from './Reducers/usersReducers'

import {addPostReducer,getPostsReducer,getPostDetailsReducer
        ,postActionReducer,deletePostReducer,getTagPostsReducer,
        getTagsReducer,clearBookmarksReducer,getBookMarksReducer} from './Reducers/PostReducers'

const userData = localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):null

const initialState = {userSignIn:{userData}}

const reducer = combineReducers({
    userSignIn:loginReducer,
    userRegister:registerReducer,
    profileDetails:profileReducer,
    updateProfile : updateProfileReducer,
    personalImage : updatePersonalImageReducer,
    addPost:addPostReducer,
    getPosts:getPostsReducer,
    postDetails:getPostDetailsReducer,
    postAction:postActionReducer,
    deletePost:deletePostReducer,
    tagPosts:getTagPostsReducer,
    allTags:getTagsReducer,
    clearBookmarks: clearBookmarksReducer,
    visitProfile: visitProfileReducer,
    getNotifications:getNotificationsReducer,
    changePassword:changePasswordReducer,
    updateInfo:updateInfoReducer,
    getBlocks:getBlocksReducer,
    search:searchUsersReducer,
    getBookMarks:getBookMarksReducer,
    suggetions:getSuggestionsReducer,
    rooms:getRoomsReducer,
    accessRoom:accessRoomReducer,
    followNotifications:getFollowNotificationsReducer,
    makeRelation:makeRelationReducer,
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store;