import React from 'react'
import { useHistory } from 'react-router-dom'

const GoBack = ({title}) => {
    const history = useHistory()
    const handleGoBack = ()=>{
        history.goBack()
    }
    return (
        <div className="w-full bg-white mr-auto border-b p-4 flex items-center justify-start">
            <button onClick={(handleGoBack)}><i class="fas fa-long-arrow-left"></i></button>
            <span className="text-lg font-bold ml-8" >{title}</span>
        </div>
    )
}

export default GoBack
