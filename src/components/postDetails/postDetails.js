import "./postDetails.css"
import { useState, useEffect } from "react"
export default function PostDetails({post}){
    const [comments,setComments] = useState()
    const getComments = async () =>{
        return fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
  .then((response) => response.json())
  .then((json) => {
    setComments(json)
  });
    }
  
    useEffect( ()=>{
      getComments()
    },[])
    
    return(<>
    <div className="flex-col dtl-post-cont">
    <div className="flex-col">
        <h1 className="post-title">{post.title}</h1>
        <p>{post.body}</p>
    </div>
    
    {comments ? 
    (    <>
    <h1>Comments</h1>
    {comments.map((comment)=>{
        
        return(<div key={comment.id} className="flex-col comment-cont">
            <h3>{comment.name}  <span className="tag-name">{`commented by ${comment.email}`}</span></h3>
            
            <p>{comment.body}</p>
            
            </div>)
    })}
   </> ) : <></>}
</div>
    
    </>)
}