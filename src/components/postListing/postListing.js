import "./postListing.css"
import { useState, createContext, useContext, useEffect } from "react";

export default function PostListing({posts,users,setPosts,setState,setFocus}){

const [filPosts,setFiltPosts] = useState(posts)
const [userID,setUser] = useState()

const delPost = async (postId)=>{
   await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  method: 'DELETE',
});}

const filterBySearch = (postList) => {
    let term = document.getElementById("search-title").value
    console.log(term)
    return postList.filter((post)=>{
        console.log(post)
        return post.title.includes(term)
    })
}

const filterByUser = (postList,userId) => {
    let term = document.getElementById("search-title").value
    console.log(term)
    return postList.filter((post)=>{
        
        return post.userId == userId
    })
}

    return (<div className="flex-col m-t-20">
        <h1>Posts</h1>
<div className="flex-row filt-cont">
    <div class="flex-col">
    <button onClick={()=>{
        console.log(document.getElementById("user-dropdown").classList)
        document.getElementById("user-dropdown").classList.toggle("drop-cont")
    }} class="filt-btn">users</button>
    <div id="user-dropdown" className="drop-cont" >
        {users.map((user) =>{
            return(<div key ={user.id} onClick={()=>{
                document.getElementById("search-title").value = ""
                if (userID == user.id){
                    setUser()
                    setFiltPosts(posts)
                    
                }
                else{
                setUser(user.id)
                setFiltPosts(filterByUser(posts,user.id))}
            }} className={userID == user.id ? "drop-user nav-main-selected" :"drop-user" }  >{user.name}</div>)
        })}

    </div>
    </div>
    
    <div className="flex-row">
        <input class="search-bar" placeholder="search titles" id="search-title" />
        <div onClick = {()=>{
            setFiltPosts(filterBySearch(filPosts))
        }} class="filt-btn search-btn">search </div>
    </div>

    <div onClick = {()=>{
            setFiltPosts(posts)
            setUser()
            document.getElementById("search-title").value = ""
        }}
        class="filt-btn"
        >clear filters</div>
</div>

    {filPosts ? filPosts.map((post)=>{

        let user = users[post.userId-1]
        
        return (<div key={post.id} className="flex-col posts-cont">
            <h1 className="post-title">{post.title}</h1>
            {user ? <h3> posted by <span className="user-span" onClick={()=>{
                setState("user-profile") 
                setFocus(post.userId)}}
                >@{user.username}</span></h3>:<></>}
            <p>{post.body}</p>
            
            <div className="flex-row">
                <div className="cmt-btn" onClick={()=>{
                    setState("post-details")
                    setFocus(post.id)
                }}> check comments</div>
                <div className="cmt-btn" onClick={()=>{
                    setState("create-post")
                    setFocus(post.id)
                }}> edit post</div> 
                <div className="cmt-btn" onClick={()=>{
                    delPost(post.id)
                }}> delete post</div> 
                </div> 
                     
        </div>)
    }):<></>}
    </div>)

}

// post schema

// body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// id: 1
// title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
// userId: 1