import React from 'react'
import { useHistory } from 'react-router-dom'

const GoBack = ({title}) => {
    const history = useHistory()
    const handleGoBack = ()=>{
        history.goBack()
    }
    return (
        <div className="w-full bg-white mr-auto border-b p-4 flex items-center justify-start">
            <button className="focus:outline-none" onClick={(handleGoBack)}><i className="fas fa-long-arrow-left"></i></button>
            <span className="text-lg font-semibold md:font-bold ml-8" >{title}</span>
        </div>
    )
}

export default GoBack
