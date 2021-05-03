import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTags } from '../Actions/PostActions'
import ErrorMessage from './ErrorMessage'

const Explor = ({type}) => {
    const {loading,error,tags} = useSelector(state => state.allTags)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTags())
    }, [])

    return <>
        <div className="mb-5 mt-1 mx-2 p-2 rounded-2xl bg-gray-100" >
                <h2 className="text-lg font-bold  border-b p-1" ># Explore</h2>
                {loading&&<loading/>}
                {error&&<ErrorMessage message={error.message} />}  
                { tags&&type=="rightside" ?
                    <>
                        { tags.sort((a, b) => (a.count > b.count) ? -1 : 1,).slice(0,4).map(tag => 
                            <div className="flex flex-col h-14 items-start  border-b p-1 " >
                                <Link to={`/tag/${tag.name}`} className="font-semibold" >{`#${tag.name}`}</Link>
                                <span>{`${tag.count} posts`}</span>
                            </div>
                        )}
                        <Link to="/tags"  className=" text-blue-400 font-semibold" >See More</Link>
                    </>:
                    tags&&tags.sort((a, b) => (a.count > b.count) ? -1 : 1,).map(tag => 
                        <div className="flex flex-col h-14 items-start  border-b p-1 " >
                            <Link to={`/tag/${tag.name}`} className="font-semibold" >{`#${tag.name}`}</Link>
                            <span>{`${tag.count} posts`}</span>
                        </div> 
                    )
                }
                
        </div>
    </>
}

export default Explor
