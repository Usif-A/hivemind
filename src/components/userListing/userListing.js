import { useState, createContext, useContext, useEffect } from "react";
import "./userListing.css"

export default function UserListing({users,setFocus,setState}){

    

    return( <div className="flex-col users-cont">
        <h1>Users</h1> 
    {users ? users.map((user)=>{
        return (
        <div key={user.id} className="flex-col user-list" onClick={()=>{
            setState("user-profile")
            setFocus(user.id)
        }
        }>
            <h3>{user.name}<span className="tag-name"> @{user.username}</span> </h3>
            <h5>{user.website}</h5>
            
            </div>
        )
    }): <>Loading . . .</>}
    </div>)
}

// user object example 

// address: 
//     city: "Gwenborough"
//     geo: {lat: '-37.3159', lng: '81.1496'}
//     street: "Kulas Light"
//     suite: "Apt. 556"
//     zipcode: "92998-3874"
// company: 
//     bs: "harness real-time e-markets"
//     catchPhrase: "Multi-layered client-server neural-net"
//     name: "Romaguera-Crona"
// email: "Sincere@april.biz"
// id: 1
// name: "Leanne Graham"
// phone: "1-770-736-8031 x56442"
// username: "Bret"
// website: "hildegard.org"