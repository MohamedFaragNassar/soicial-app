import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import GoBack from '../GoBack'
import {changePassword} from '../../Actions/userActions'
import ErrorMessage from '../ErrorMessage'


const ChangePassword = () => {
    const [current,setCurrent]  = useState()
    const [newPassword,setNewPassword]  = useState()
    const [confirmNew,setConfirmNew]  = useState()
    const [Error,setError]  = useState()

    const dispatch = useDispatch()
    const {loading,error,data} = useSelector(state => state.changePassword)

    const handleChangePassword = (e)=>{
        e.preventDefault()
        setError(null)
        if(newPassword != confirmNew){
            setError("password should match")
        }else{
            dispatch(changePassword(newPassword,current))
        }
    }
    
    console.log(error)

    return (
        <div>
            <GoBack title="Changing Password"/>
            <form onSubmit={(e)=>handleChangePassword(e)} className="flex flex-col items-center justify-between mt-5 w-full">
                 <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Current Password</span>
                    <input onChange={(e)=>setCurrent(e.target.value)} required={true}  
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                 <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">New Password</span>
                    <input onChange={(e)=>setNewPassword(e.target.value)} required={true}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                 <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Confirm Password</span>
                    <input onChange={(e)=>setConfirmNew(e.target.value)} required={true}
                     className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                <button className="px-4 py-2 border border rounded-full mr-2
                         text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 ">Save</button>
            </form>
            {loading?<div>loading</div>
            :error?<ErrorMessage message={error.message} />
            :Error?<ErrorMessage message={Error} />
            :data?<div>password changed successfully</div>:null}
        </div>
    )
}

export default ChangePassword
