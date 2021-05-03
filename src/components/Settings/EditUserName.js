import React, { useState } from 'react'
import GoBack from '../GoBack'
import { useDispatch, useSelector } from 'react-redux'
import {updateInfo} from '../../Actions/userActions'
import ErrorMessage from '../ErrorMessage'

const EditUserName = () => {

    const {loading,error,profile} = useSelector(state => state.profileDetails)

    const [username,setUsername] = useState()
    const [isDisabled,setIsDisabled] = useState(true)
    const dispatch = useDispatch()

    const handleInputChange = (e)=>{
        setIsDisabled(false)
        setUsername(e.target.value)
    }

    const handleUpdateProfile = (e) =>{
        e.preventDefault()
        dispatch(updateInfo({
           username,
           action:"username"
        }))
    }

    return (
        <div>
            <GoBack title="Edit UserName" />
            <form className="mt-5" onSubmit={(e)=>handleUpdateProfile(e)}>
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">username</span>
                    <input className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                     type="text" defaultValue={profile&&profile.username} onChange={(e)=>handleInputChange(e)} required={true} />
                </div>
                <div className="w-full flex items-center justify-center">
                    <button disabled={isDisabled} className={`px-4 py-2 border  rounded-full 
                    text-white  text-lg font-semibold ${!isDisabled? " hover:bg-blue-500 bg-blue-400":"bg-gray-400"}`}>
                        Save
                    </button>
                </div>
            </form>
            {loading?<div>loading</div>:error?<ErrorMessage message={error.message} />:null}
        </div>
    )
}

export default EditUserName
