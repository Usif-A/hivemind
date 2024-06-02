import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect } from "react";
import Profile from './components/profile/profile';
import UserListing from './components/userListing/userListing';
import PostListing from './components/postListing/postListing';
import PostDetails from './components/postDetails/postDetails';
import Dashboard from './components/dashboard/dashboard';
import CreatePost from './components/createPost/createPost';

function App() {
  
  const [state,setState] = useState()
  const [posts,setPosts] = useState()
  const [users,setUsers] = useState()
  const [focusId,setFocus] = useState()


  const getUsers = async () =>{
      return fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => response.json())
.then((json) => {
  setUsers(json)
});
  }



  const getPosts = async () =>{
      return fetch('https://jsonplaceholder.typicode.com/posts')
.then((response) => response.json())
.then((json) => {
  setPosts(json)
});
  }

  useEffect( ()=>{
    getUsers()
    getPosts()
  },[])



  const changeState = (stateName) =>{
    if(state == stateName)setState("")  
    else setState(stateName)
  }


  return (<>
    <div className="App flex-row">
      


      {/* big screen nav*/ }
      <div className='sidebar'>
        
        <h1 className={state == "user-listing" ?'nav-main nav-main-selected' :'nav-main'} id="user-listing"
        onClick={()=>{
          changeState("user-listing")
          }}>Users  </h1>
        <h1 className={state == "post-listing" ?'nav-main nav-main-selected' :'nav-main'} id="post-listing"
        onClick={()=>{
        changeState("post-listing")
        }}>Posts </h1>
        <h1 className={state == "dashboard" ?'nav-main nav-main-selected' :'nav-main'} id="dashboard"
        onClick={()=>{
          changeState("dashboard")
          }}>Dashboard</h1>
        <h1 className={state == "create-post" ?'nav-main nav-main-selected' :'nav-main'} id="create-post"
        onClick={()=>{
          setFocus()
          changeState("create-post")
          }}>editor</h1>
        
      </div>
      <>
      {state?
      (state == "user-profile" ? <Profile user={users[focusId-1]} /> :
      (state == "user-listing"? <UserListing users={users} setFocus={setFocus} setState={setState}/>:
      (state == "post-listing"? <PostListing posts={posts} users={users} setPosts={setPosts} setFocus={setFocus} setState={setState}/>:
      (state == "post-details"? <PostDetails post={posts[focusId-1]}/> :
      (state == "dashboard"? <Dashboard posts={posts} /> :
      (state == "create-post"? <CreatePost post={focusId ? posts[focusId-1]: null} /> :
      <div>{state}</div>)
    )
    ))
    ))
      :<></>}</>
      
    </div>
    <div className='navbar'>
      <h1 className={state == "user-listing" ?'nav-phone nav-main-selected' :'nav-phone'} id="user-listing"
        onClick={()=>{
          changeState("user-listing")
          }}>Users  </h1>
          
      <h1 className={state == "post-listing" ?'nav-phone nav-main-selected' :'nav-phone'} id="post-listing"
        onClick={()=>{
        changeState("post-listing")
        }}>Posts </h1>
      <h1 className={state == "dashboard" ?'nav-phone nav-main-selected' :'nav-phone'} id="dashboard"
        onClick={()=>{
          changeState("dashboard")
          }}>Dashboard</h1>
      <h1 className={state == "create-post" ?'nav-phone nav-main-selected' :'nav-phone'} id="create-post"
        onClick={()=>{
          setFocus()
          changeState("create-post")
          }}>editor</h1>
    </div>
    </>
  );
}

export default App;


