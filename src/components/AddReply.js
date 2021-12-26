import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {addPost} from '../Actions/PostActions'
import {hideAndShow} from '../helpers/helpers'
import {useClickToClose} from '../helpers/CTC'
import Picker from 'emoji-picker-react'

const AddReply = ({post,isOpen,close,node}) => {
    const [tags,setTags] = useState([])
    const [content,setContent] = useState()
    const [image,setImage] = useState()
    const [isPickerOpen,setIsPickerOpen] = useState(false)

    const {profile} = useSelector(state => state.profileDetails)

    const dispatch = useDispatch()

    const handleShowForm = () => {
        hideAndShow("add_reply_btn","add_reply_form")
    }

    const handleAddTag = (e) => {
        e.preventDefault()
        const tag = document.getElementById("add_reply_input").value.replace(/\s/g, "")
        setTags([...new Set([...tags,tag])])
        hideAndShow("add_reply_form","add_reply_btn")
    }

    const handleAddEmoji = (e,emoji)=>{
        console.log(emoji)
        const area = document.getElementById("replyContent")
        let val = area.value
        val = val+emoji.emoji
        area.value = val
        setContent(val)
    }


    const handleAddReply = () => {
         const formData  = new FormData()
        formData.append("content",content)
        formData.append("tags",JSON.stringify(tags))
        formData.append("type","reply")
        formData.append("parent",post.id)
        if(image){

            formData.append("image",image)
        }
        if(content){
            dispatch(addPost(formData,"reply"))
        }
        close()
    }

    const pickerNode = useClickToClose(()=>setIsPickerOpen(false),"#picker")

    
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10 " ></div>
        <div ref={node} id="addReply" className="lg:w-2/5 md:w-5/6 w-11/12 fixed top-6  md:top-10 rounded-2xl
          bg-white flex flex-col items-center justify-between py-2 z-20" >
              <div className="w-full p-1 border-b flex items-start" >
                  <button onClick={close}><i className="fal fa-times-circle text-xl ml-2"></i></button>
              </div>
              <div  className="p-2  flex flex-col items-center justify-between mx-auto  relative\
                             rounded-sm bg-white h-auto   w-full" >
                <div className=" w-full flex items-start justify-between">
                <div className=" flex items-start justify-center  " >
                        <img className="w-12 h-12 rounded-full" src={`/media/${post.user.personal_image}`} />
                        <Link className="ml-3 text-xl mt-.5 font-semibold" to="/" >
                            {`${post.user.first_name} ${post.user.last_name}`}
                        </Link>
                        <span className="ml-2 mt-1.5 text-sm text-gray-400" >{post.user.userName}</span>
                </div>
                </div>
                <div  className="w-full p-2 h-auto text-left " >{post.content}</div>
                {post.image? <img className="w-full mx-auto rounded-lg max-h-80" src={`/media/${post.image}`} /> :null}
            </div>
            <div className="h-max min-h-40 pl-2 flex items-center justify-start bg-white mx-auto
                rounded-lg  p-2 mt-1" style={{width:95+"%"}}>
                {profile&&<div className="h-full w-1/12 flex justify-center items-start mb-auto mt-2 ">
                    <img className=" w-8 h-8 md:w-12 md:h-12 rounded-full" src={`/media/${profile.personal_image}`} />
                </div>}
                <div className="w-11/12 flex flex-col justify-center items-start" >
                    <textarea id="replyContent" className="h-max w-11/12  ml-4 focus:outline-none " 
                    onChange={(e)=>setContent(e.target.value)}
                     placeholder="Add your reply" style={{resize:"none"}} ></textarea>
                    <div className="w-8/12 flex items center justify-start flex-wrap">
                        {tags.map(tag => 
                            <span key={tag} className="ml-2 text-blue-800" >{`#${tag}`}</span>    
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between p-2" >
                        <div className="ml-5 flex items-center justify-between ">
                            <div>
                                <input type="file" id="image" className="hidden focus:outline-none" 
                                onChange={(e)=>setImage(e.target.files[0])} />
                                <label className="mr-3 text-lg md:text-xl focus:outline-none text-blue-400 cursor-pointer" 
                                htmlFor="image" >
                                    <i className="fal fa-file-image"></i>
                                </label>
                            </div>
                            <button  className="mr-3 text-lg md:text-xl text-blue-400 relative " onClick={()=>setIsPickerOpen(true)}>
                                <i className="fal fa-smile-beam"></i>
                                {isPickerOpen&&<span ref={pickerNode} id="picker" className="absolute z-10 bottom-0 -left-1">
                                    <Picker onEmojiClick={handleAddEmoji} />
                                </span>}
                            </button>
                            <div>
                                <button id="add_reply_btn" onClick={()=>handleShowForm()} >
                                    <i className="fas fa-hashtag text-blue-400"></i>
                                </button>
                                <form onSubmit={(e)=>handleAddTag(e)} id="add_reply_form" className="hidden" >
                                    <input id="add_reply_input" required={true} className="border p-1 rounded-lg" type="text" />
                                    <button type="submit" >+</button>
                                </form>
                            </div>
                        </div>
                        <button onClick={handleAddReply}
                        className="px-6 py-2 rounded-full text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 " >
                            reply
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddReply
