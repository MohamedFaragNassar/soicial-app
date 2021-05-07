import React, { useState } from 'react'
import {debounce} from '../helpers/helpers'
import {searchUsers} from '../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import {Link} from 'react-router-dom'
import {useClickToClose} from '../helpers/CTC'
const Search = ({type}) => {
    const [isOpen,setIsOpen] = useState(false) 
    const {loading,error,users} = useSelector(state => state.search)
    const dispatch = useDispatch()
    
    const handleSearchUsers = debounce(async(keyword)=>{
        setIsOpen(true)
        dispatch(searchUsers(keyword))
    })

    console.log(users)
    console.log(isOpen)
    const domeNode = useClickToClose(()=>setIsOpen(false),"#searchResult")
    
    return <>
        <div className={` ${type=="header"?"hidden md:block w-3/5":"block w-5/6 mx-auto mt-2"}`}>
            <div className="inline-flex flex-col justify-center relative text-gray-500 w-full">
                <div className="relative w-full">
                    <input type="text" onChange={(e)=>handleSearchUsers(e.target.value)}
                    className={`p-2 pl-8 rounded-lg border border-gray-200 
                    ${type=="header"?'bg-gray-100':"bg-gray-50"} 
                  focus:bg-white focus:outline-none focus:border-2 focus:border-blue-500 w-full`} placeholder="search..." />
                    <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                {isOpen&&users ?
                <ul ref={domeNode} id="searchResult" class="bg-white border border-gray-100 w-full mt-2 absolute top-10 ">
                    {users?.map(user => 
                        <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                            <Link to={`/profile/${user.username}`}>@{user.username}</Link>
                        </li>    
                    )}
                </ul> :null } 
            </div>
        </div>
    </>
}

export default Search
