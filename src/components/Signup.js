import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {register} from '../Actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const Signup = () => {
    const [first_name,setFirstname] = useState()
    const [last_name,setLasttname] = useState()
    const [email,setEmail] = useState()
    const [birthday,setBirthday] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [confirm,setConfirm] = useState()
    const [Error,setError] = useState()
    
    const history = useHistory()
    const {userData}   =  useSelector(state => state.userSignIn)
    
    const dispatch = useDispatch()
    const {loading,error,registeredUser} = useSelector(state => state.userRegister)
   
    const handleSignUp = (e) => {
        e.preventDefault()
        if(password !== confirm){
            setError("password should match")
        }else{
            dispatch(register({
                first_name,
                last_name,
                email,
                password,
                username,
                birthday
            }))
        }
    }

    useEffect(() => {
        if(userData){
            history.push("/")
        }
    }, [userData])

    return (
        <form className="flex flex-col items-center justify-evenly w-full h-5/6 " onSubmit={(e)=>handleSignUp(e)}  >
            <Link to="/welcome" className="text-2xl font-bold text-blue-600 text-left mb-2">Social App</Link>
            <div className="w-11/12 relative  mb-4 mx-auto flex items-center justify-between" >
               <div className=" relative"  style={{width:48+"%"}} >
                    <span  className="absolute top-2 left-4">First Name</span>
                    <input required={true} onChange={(e)=>setFirstname(e.target.value)}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
               </div>
               <div className=" relative " style={{width:48+"%"}} >
                    <span  className="absolute top-2 left-4">Last Name</span>
                    <input required={true} onChange={(e)=>setLasttname(e.target.value)}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
               </div>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Email</span>
                <input required={true} onChange={(e)=>setEmail(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">username</span>
                <input required={true} onChange={(e)=>setUsername(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Birthday</span>
                <input required={true} onChange={(e)=>setBirthday(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="date"/>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Password</span>
                <input required={true} onChange={(e)=>setPassword(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Confirm Password</span>
                <input required={true} onChange={(e)=>setConfirm(e.target.value)}
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
            </div>
            <button className="px-20 py-2 bg-blue-400 rounded-full
             font-semibold text-xl text-white hover:bg-blue-500" >
               
                sign up
            </button>
            <Link to="/welcome/signin/ " className="text-blue-600 hover:text-blue-800" >already have account ? Sign in</Link>
            {Error?<ErrorMessage message={Error} close={()=>setError(null)} />: 
                error?<ErrorMessage message={error} close={()=>setError(null)} />: null}
            {loading? <div className="w-full flex items-center justify-center "><Spinner /></div>:null}
        </form>
    )
}

export default Signup
