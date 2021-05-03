import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import GoBack from '../GoBack'

const AccountInformation = () => {

    const {loading,error,profile} = useSelector(state => state.profileDetails)

    return <>
        {loading?<loading>Loading</loading>:error?<ErrorMessage message={error.message} /> : profile ?
        <div>
            <GoBack title="Account Informations" />
            <div>
                <Link to="/settings/username" className="px-2 py-4 font-semibold text-lg border-b w-full text-left
                 flex justify-between items-center" >
                    <div className="flex flex-col items-start">
                        <span>UserName</span>
                        <span className="text-sm text-gray-400">{profile.username}</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </Link>
                <Link to="/settings/email" className="px-2 py-4 font-semibold text-lg border-b w-
                    full text-left flex justify-between items-center" >
                    <div className="flex flex-col items-start">
                        <span>Email</span>
                        <span className="text-sm text-gray-400">{profile.email}</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </Link>
                <Link to="/settings/gender" className="px-2 py-4 font-semibold text-lg border-b w-full text-left 
                flex justify-between items-center" >
                    <div className="flex flex-col items-start">
                        <span>Gender</span>
                        <span className="text-sm text-gray-400">{profile.gender}</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </Link>
            </div>
        </div> : null }
    </>
}

export default AccountInformation
