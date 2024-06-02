import "./createPost.css"
import { useState } from "react"; 

export default function CreatePost({post}){

    const [err,setErr] = useState()

const postPost = ()=>{
    if(document.getElementById("post-title").value.length > 0 && document.getElementById("post-body").value.length > 0){
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));}else{
    setErr("please fill in both fields")
  }
}
const putPost = ()=>{

    console.log()

    if( document.getElementById("post-title").value.length > 0 && document.getElementById("post-body").value.length > 0){
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: post.id,
    title: document.getElementById("post-title").value.substring(0, 100),
    body: document.getElementById("post-body").value.substring(0, 500),
    userId: post.userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}else{setErr("please fill in both fields")}
}

    return(<div className="flex-col editor-cont">
        <h1>{post? "Edit Post": "Create Post"}</h1>
        <textarea className={err? "text-edit err" :"text-edit"} id="post-title" name="message" placeholder="write the POST Title" rows="5" cols="30">
{post?post.title:null}
</textarea>
<textarea name="message" className={err? "text-edit err" :"text-edit"} id="post-body" placeholder="write the POST Body" rows="10" cols="30">
{post?post.body:null}
</textarea>

{err ? <div className="err">{err}</div>:<></>}
<button onClick={()=>{
    setErr()
    if(post){putPost()}else{postPost()}
}} className="filt-btn m-t-20">Submit</button>
    </div>)
}