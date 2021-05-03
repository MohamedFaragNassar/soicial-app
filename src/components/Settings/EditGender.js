import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from '../GoBack'
import {updateInfo} from '../../Actions/userActions'

const EditGender = () => {
    const {profile} = useSelector(state => state.profileDetails)
    const [gender,setGender] = useState(profile?.gender)
    const dispatch = useDispatch()
    console.log(profile)
    console.log(gender)
    const handleUpdateProfile = () =>{
        dispatch(updateInfo({
           gender:gender,
           action:"gender"
        }))
    }
    useEffect(() => {
        setGender(profile?.gender)
    }, [profile])
    return (
        <div>
            <GoBack title="Edit Gender" />
            <div className="mt-5" >
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Gender</span>
                    <select onChange={(e)=>setGender(e.target.value)} defaultValue={profile?.gender}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400">
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                    </select>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button onClick={()=>handleUpdateProfile()}
                    className="px-4 py-2 border rounded-full mr-2
                    text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 ">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditGender
