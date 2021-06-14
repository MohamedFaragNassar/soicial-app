import React from 'react'
import { Route } from 'react-router-dom'
import Ghuest from './Ghuest'
import Signin from './Signin'
import Signup from './Signup'

const Welcome = () => {
    return <>
        <div className="fixed top-0 left-0 w-full  z-20 h-screen bg-white flex items-center p-4" style={{paddingLeft:10+"%",paddingRight:10+"%"}}>
            <div className="w-1/2 h-2/3 hidden md:block " >
                <img src="https://res.cloudinary.com/dt3fknrkp/image/upload/v1620652652/media/welcome_uuixok.jpg" 
                className="w-full h-full" />
            </div>
            <div className="h-full w-full md:w-1/2 flex flex-col items-center justify-start
             mt-20 md:mt-0 md:justify-center mx-auto focus:outline-none" >
                <Route path="/welcome" exact={true} component={Ghuest} />
                <Route path="/welcome/signin" component={Signin} />
                <Route path="/welcome/signup" component={Signup} />
            </div>
        </div>
    </>
}
export default Welcome
