import React, { useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../Actions/userActions'
import ErrorMessage from '../components/ErrorMessage'

const Signin = () => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()

    const dispatch = useDispatch()
    const x =  useSelector(state => state.userSignIn)
    const {loading,error,userData} = x 
    const history = useHistory()
    const handleSignIn = (e)=>{
        e.preventDefault()
        dispatch(login(username,password))
        
    }
    console.log(x)
    useEffect(() => {
        if(userData){
            history.push("/")
        }
    }, [userData])

    return (
        <form onSubmit={(e)=>handleSignIn(e)} className="flex flex-col items-center justify-between w-full h-1/2" > 
            <div className="text-2xl font-bold text-blue-600 text-left">Social App</div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Email or username</span>
                <input required={true} onChange={(e)=>setUsername(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Password</span>
                <input required={true}  onChange={(e)=>setPassword(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
            </div>
            <button  className="px-20 py-2 bg-blue-400 rounded-full
             font-semibold text-xl text-white hover:bg-blue-500" >
                sign in
            </button>
            <Link to="/welcome/signup/ " className="text-blue-600 hover:text-blue-800" > does not have account ? Sign up</Link>
            {error?<ErrorMessage message={error}  />:null}
            {loading?<div>loading</div>:null}
        </form>
    )
}

export default Signin
