import React from 'react'

const Number = ({number,right}) => {
    return (
        <span className={`w-6 h-6 bg-red-600 text-white rounded-full text-sm text-center text-600 border-2 border-white 
            absolute -top-2 ${`right-${right}`}`}>{number}</span>
    )
}

export default Number
