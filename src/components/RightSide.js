import React from 'react'
import Explor from './Explor'
import WhoToFollow from './WhoToFollow'

const RightSide = () => {
    
    return <>
        <div className="right-side h-screen border-l md:border-none lg:block fixed top-0  pt-20 hidden " style={{width:27+"%",right:7.5+"%"}} >
            <Explor type="rightside"/>
            <WhoToFollow/>
            
        </div>
    </>
}

export default RightSide
