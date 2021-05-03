import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getTags} from '../Actions/PostActions'
import ErrorMessage from './ErrorMessage'
import {getSuggetions} from '../Actions/userActions'
import Explor from './Explor'
import WhoToFollow from './WhoToFollow'

const RightSide = () => {
    
    return <>
        <div className="right-side h-screen border-l lg:block fixed top-0  pt-20 hidden " style={{width:27+"%",right:7.5+"%"}} >
            <Explor type="rightside"/>
            <WhoToFollow/>
            
        </div>
    </>
}

export default RightSide
