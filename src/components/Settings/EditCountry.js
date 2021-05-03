import React from 'react'
import GoBack from '../GoBack'

const EditCountry = () => {
    return (
        <div>
            <GoBack title="Edit Country" />
            <div className="mt-5">
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Country</span>
                    <input className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                     type="text" defaultValue={"Egypt"}/>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button className="px-4 py-2 border rounded-full mr-2
                            text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 ">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditCountry
