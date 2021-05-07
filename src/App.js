import React, {useState} from 'react'
import {Link,BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import RightSide from './components/RightSide'
import LeftSide from './components/LeftSide'
import Main from './components/Main'
import Profile from './components/Profile';
import PostDetails from './components/PostDetails';
import TagPage from './components/TagPage';
import Connect from './components/Connect';
import Bookmarks from './components/Bookmarks';
import Setting from './components/Settings/Setting';
import AllMesages from './components/AllMesages';
import ChatRoom from './components/ChatRoom';
import Welcome from './components/Welcome';
import ProtectedRoute from './components/ProtectedRoute'
import UnRegiseredRoute from './components/UnRegiseredRoute';
import {useSelector } from "react-redux"
import VisitProfile from './components/VisitProfile';
import AllNotifications from './components/AllNotifications';
import SearchPage from './components/SearchPage';
import Explor from './components/Explor';
import Requests from './components/Requests';

function App() {

    const {userData} = useSelector(state => state.userSignIn)

  return <>
  <BrowserRouter>
    <div className="App w-screen ">
        {userData?<>
            <Header />
            <RightSide/>
            <LeftSide/>
        </>:null}
        <div className=" main min-h-screen  bg-gray-200 absolute border-r">
            <ProtectedRoute path="/" exact={true} component={Main} />
            <ProtectedRoute path="/profile" exact={true}  component={Profile} />
            <ProtectedRoute path="/profile/:username" component={VisitProfile} />
            <ProtectedRoute path="/post/:id" component={PostDetails} />
            <ProtectedRoute path="/tag/:tag" component={TagPage} />
            <ProtectedRoute path="/tags" component={Explor} />
            <ProtectedRoute path="/connect" component={Connect} />
            <ProtectedRoute path="/search" component={SearchPage} />
            <ProtectedRoute path="/bookmarks" component={Bookmarks} />
            <ProtectedRoute path="/notifications" component={AllNotifications} />
            <ProtectedRoute path="/requests" component={Requests} />
            <ProtectedRoute path="/settings" component={Setting} />
            <ProtectedRoute path="/messages" exact={true} component={AllMesages} />
            <ProtectedRoute path="/messages/:id" component={ChatRoom} />
            <UnRegiseredRoute path="/welcome" component={Welcome} />
        </div>
    </div>
    </BrowserRouter>
    </>
}

export default App;
