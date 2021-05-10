import React, { useEffect, useState } from 'react'
import Post from './Post'
import {useDispatch,useSelector} from 'react-redux'
import {addPost,getPosts} from '../Actions/PostActions'
import {hideAndShow} from '../helpers/helpers'
import {useClickToClose} from '../helpers/CTC'
import Picker from 'emoji-picker-react'
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
     
    const [content,setContent] = useState()
    const [tags,setTags] = useState([])
    const [image,setImage] = useState()
    const [isOpen,setIsOpen] = useState(false)
    const [page,setPage] = useState(1)
    const dispatch = useDispatch()

    const {posts}= useSelector(state => state.getPosts)
    const {loading,error,addedPost}= useSelector(state => state.addPost)
    const {profile} = useSelector(state => state.profileDetails)


    const handleAddPost = ()=>{
        const formData  = new FormData()
        formData.append("content",content)
        formData.append("tags",JSON.stringify(tags))
        formData.append("type","post")
        if(image){

            formData.append("image",image)
        }
        if(content){
            dispatch(addPost(formData))
        }

        setContent(null)
        setImage(null)
        document.getElementById("contentArea").value=null

    }

    const handleShowForm = () => {
        hideAndShow("add_tag_btn","add_tag_form")
    }

    const handleHideMenu = () => {
        hideAndShow("add_tag_form","add_tag_btn")
    }

    const domeNode   = useClickToClose(handleHideMenu,"#add_tag_form")
    const pickerNode = useClickToClose(()=>setIsOpen(false),"#picker")

    const handleAddTag = (e) => {
        e.preventDefault()
        const input = document.getElementById("add_tag_input")
        const tag = input.value.replace(/\s/g, "")
        setTags([...tags,tag])
        hideAndShow("add_tag_form","add_tag_btn")
        input.value = ""
    }

    const handleAddEmoji = (e,emoji)=>{
        console.log(emoji)
        const area = document.getElementById("contentArea")
        let val = area.value
        val = val+emoji.emoji
        area.value = val
        setContent(val)
    }

    useEffect(() => {
        dispatch(getPosts("all",page))
    }, [page])


    return <>
        
            <div className="h-max min-h-40 mb-2 pl-2 flex items-center justify-start bg-white mx-auto
                rounded-lg shadow-md p-2 mt-1" style={{width:98+"%"}}>
                {profile&&<div className="h-full w-2/12 md:w-1/12  flex justify-center items-start mb-auto mt-2 ">
                    <img className=" w-8 h-8 md:w-12 md:h-12 rounded-full"
                     src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1620328850/${profile.personal_image}`} />
                </div>}
                <div className="w-11/12 flex flex-col justify-center items-start" >
                    <textarea id="contentArea" onChange={(e)=>setContent(e.target.value)} 
                    className="h-max w-11/12 border-b ml-1 md:ml-2 focus:outline-none outline-none " 
                    placeholder="What's happening" style={{resize:"none"}} ></textarea>
                    <div className="w-8/12 flex items center justify-start flex-wrap outline-none focus:outline-none">
                        {tags.map(tag => 
                            <span key={uuidv4()} className="ml-2 text-blue-800" >{`#${tag}`}</span>    
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between p-2" >
                        <div className="ml-5 flex items-center justify-between ">
                            <div>
                                <input type="file" id="image" className="hidden" onChange={(e)=>setImage(e.target.files[0])} />
                                <label className="mr-3 text-lg md:text-xl text-blue-400 cursor-pointer  focus:outline-none" for="image" >
                                    <i className="fal fa-file-image"></i>
                                </label>
                            </div>
                            <button  className="mr-3 text-lg md:text-xl text-blue-400 relative  focus:outline-none " 
                            onClick={()=>setIsOpen(true)} >
                                <i className="fal fa-smile-beam"></i>
                                {isOpen&&<span ref={pickerNode} id="picker" className="absolute z-10 top-0 -left-1 focus:outline-none">
                                    <Picker onEmojiClick={handleAddEmoji} />
                                </span>}
                            </button>
                            <div>
                                <button id="add_tag_btn" className=" focus:outline-none" onClick={()=>handleShowForm()} >
                                    <i className="fas fa-hashtag text-blue-400"></i>
                                </button>
                                <div ref={domeNode} id="add_tag_form" className="hidden" >
                                    <input id="add_tag_input" required={true} 
                                    className="border p-1 rounded-lg w-2/3  focus:outline-none" type="text" />
                                    <button type="submit" className="focus:outline-none" onClick={(e)=>handleAddTag(e)} >+</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleAddPost} className=" px-4 py-1 md:px-6 md:py-2 border  rounded-full
                         text-white bg-blue-400 text-lg font-medium md:font-semibold hover:bg-blue-500 ">
                             Post
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {loading&&<Spinner/>}
                    </div>
                </div>
            </div>
            {posts&&posts.results.map(post => 
                <Post key={uuidv4()} post={post} type="post" />    
            )}

           {posts?.next&&<button onClick={()=>setPage(page+1)} className="w-full h-10 bg-blue-50 hover:bg-blue-100 mb-2">
               Load More
           </button>}
        
    </>
}


export default Main