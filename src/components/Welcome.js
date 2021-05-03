import React from 'react'
import { Route } from 'react-router-dom'
import Ghuest from './Ghuest'
import Signin from './Signin'
import Signup from './Signup'

const Welcome = () => {
    return <>
        <div className="fixed w-full top-0 left-0 z-20 h-20 bg-white" ></div>
        <div className="fixed top-0  z-20 h-screen bg-white flex items-center p-4  " style={{left:7.5+"%",width:85+"%"}} >
            <div className="w-1/2 h-2/3 " >
                <img src="../welcome.jpg" className="w-full h-full" />
            </div>
            <div className="h-full w-1/2 flex flex-col items-center justify-center" >
                <Route path="/welcome" exact={true} component={Ghuest} />
                <Route path="/welcome/signin" component={Signin} />
                <Route path="/welcome/signup" component={Signup} />
            </div>
        </div>
    </>
}
export default Welcome
