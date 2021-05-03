import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useSelector } from "react-redux"

const UnRegiseredRoute = ({component:Component,...rest}) =>{

  const {userData} = useSelector(state => state.userSignIn)
  
  
    return (
        <Route {...rest} render = {props => {
            if(userData){
                return <Redirect to={{pathname:"/"}}/>
            }else{
                return <Component {...props} />
            }
        }} />
    )
}

export default UnRegiseredRoute;