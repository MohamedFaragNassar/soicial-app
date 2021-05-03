import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {updateProfile,updatePersonalImage,updateCoverImage} from '../Actions/userActions'

const EditProfile = ({isOpen,close,domNode,user}) => {
    
    const [first_name,setFirstname] = useState(null)
    const [last_name,setLasttname] = useState(null) 
    const [bio,setBio] = useState(null) 
    const [location,setLocation] = useState(null) 
    const [website,setWebsite] = useState(null) 
    
    const dispatch = useDispatch()
    
    const handleUpdateProfile = () =>{
        dispatch(updateProfile({
            first_name,
            last_name,
            bio,
            location,
            website
        }))

        close()
    }

    const handleUploadPersonalImage = (e) => {
        const formData = new FormData()
        const img = e.target.files[0]
        formData.append("personal_image",img)
        dispatch(updatePersonalImage(formData))
    }
    
    const handleUploadCoverImage = (e) => {
        const formData = new FormData()
        const img = e.target.files[0]
        formData.append("cover_image",img)
        dispatch(updateCoverImage(formData))
    }

    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10 " ></div>
        <div id="edit-profile" ref={domNode} className="lg:w-2/5 md:w-5/6 w-11/12 fixed top-2 md:top-5 rounded-2xl
          bg-white flex flex-col items-center justify-between py-2 z-20">
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex w-36 items-center justify-between ml-2">
                    <button className="ml-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-bold text-xl">Edit Profile</h1>
                </div>
                <button  onClick={handleUpdateProfile}
                    className="px-4 py-1 border border rounded-full mr-2 
                    text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 ">
                         Save
                </button>
            </div>
            <div className="relative w-full">
                <div className="w-full relative" > 
                    <img className="w-full h-48 "  src={`/media/${user.cover_image}`}/>
                    <label for="cover_image" className="absolute text-xl cursor-pointer " style={{left:40+"%",top:40+"%"}} >
                            <i class="fal fa-camera-alt opacity-60 hover:opacity-100"></i> 
                    </label>
                    <input onChange={(e)=>handleUploadCoverImage(e)} id="cover_image" type="file" className="hidden" />
                </div>
                <div className="w-40 flex flex-col item-center justify-between  absolute top-28 " >
                    <div className="w-full h-full relative" >
                        <img src={`/media/${user.personal_image}`} className="w-32 h-32 rounded-full border-4 border-white mx-auto" />
                        <label for="personal_image" className="absolute text-xl cursor-pointer " style={{left:40+"%",top:40+"%"}} >
                            <i class="fal fa-camera-alt opacity-60 hover:opacity-100"></i> 
                        </label>
                        <input onChange={(e)=>handleUploadPersonalImage(e)} id="personal_image" type="file" className="hidden" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-12 md:mt-20 w-full" >
                <div className="w-11/12 relative flex items-center justify-between  md:mb-4 mb-2 mx-auto" >
                    <div className="relative" style={{width:45+"%"}}>
                        <span className="absolute top-2 left-4">First Name</span>
                        <input onChange={(e)=>setFirstname(e.target.value)} defaultValue={user.first_name} 
                        className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
                    </div>
                    <div  className="relative"  style={{width:45+"%"}}>
                        <span className="absolute top-2 left-4">Last Name</span>
                        <input onChange={(e)=>setLasttname(e.target.value)} defaultValue={user.last_name} 
                        className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
                    </div>
                </div>
                <div  className="w-11/12 relative  md:mb-4 mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Bio</span>
                    <textarea defaultValue={user.bio} className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                     style={{resize:"none"}} onChange={(e)=>setBio(e.target.value)}  />
                </div>
                <div  className="w-11/12 relative  md:mb-4 mb-2 mx-auto">
                    <span className="absolute top-2 left-4" >Location</span>
                    <input defaultValue={user.location} onChange={(e)=>setLocation(e.target.value)}
                     className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
                </div>
                <div  className="w-11/12 relative  md:mb-4 mb-2 mx-auto">
                    <span className="absolute top-2 left-4" >Website</span>
                    <input defaultValue={user.website} onChange={(e)=>setWebsite(e.target.value)}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
                </div>
            </div>
        </div>
    </>
}

export default EditProfile
