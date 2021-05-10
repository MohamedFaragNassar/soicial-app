import React, { useState } from 'react'

import ErrorMessage from './ErrorMessage'
import GoBack from './GoBack'
import Requests from './Requests'
import TweetNotf from './TweetNotf'

const AllNotifications = () => {
    const [type,setType] = useState("tweets")

    

    return <>
        <div>
            <GoBack title="Notifications" />
            <div className="w-full" >
                <div className="w-full h-16 border-b  bg-white ">
                    <button onClick={()=>setType("tweets")}  className={`w-1/2 h-full text-md lg:text-lg font-bold hover:bg-gray-200\
                     ${type==="mytweets"?"text-blue-600 border-b-2 border-blue-600":null} focus:outline-none  `}>
                        Tweets Notifications
                    </button>
                    <button onClick={()=>setType("followers")} className={`w-1/2 h-full text-md lg:text-lg font-bold hover:bg-gray-200 \
                        ${type==="likes"?"text-blue-600 border-b-2 border-blue-600":null} focus:outline-none `} >
                        Followers Notifications
                    </button>
                </div>
            </div>  
           {type=="tweets"?<TweetNotf/>:<Requests/>}
        </div> 
    </>
}

export default AllNotifications
