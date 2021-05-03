import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInfo } from '../../Actions/userActions'
import GoBack from '../GoBack'

const EditEmail = () => {
    const dispatch = useDispatch()
    const [email,setEmail] = useState()
    const [isDisabled,setIsDisabled] = useState(true)
    
    const handleInputChange = (e)=>{
        setIsDisabled(false)
        setEmail(e.target.value)
    }

    const {profile} = useSelector(state => state.profileDetails)
    
    const handleUpdateProfile = () =>{
        dispatch(updateInfo({
           email,
           action:"email"
        }))
    }

    return (
        <div>
            <GoBack title="Edit Email" />
            <div className="mt-5" >
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Email</span>
                    <input className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" 
                    type="text" defaultValue={profile?.email} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="w-full flex items-center justify-center">
                    <button disabled={isDisabled} onClick={()=>handleUpdateProfile()}
                    className={`px-4 py-2 border rounded-full mr-2 ${!isDisabled? " hover:bg-blue-500 bg-blue-400":"bg-gray-400"}
                    text-white `}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditEmail
