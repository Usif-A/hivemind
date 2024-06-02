import "./profile.css"

export default function Profile({user}){

    return( 
    <>
    <div className="flex-col profile-cont"> 
    <h1>{user.name}</h1>
    <table>
        <tr>
            <td className="label">Username:</td>
            <td>{user.username}</td>
        </tr>
        <tr>
            <td className="label">Phone:</td>
            <td>{user.phone}</td>
        </tr>
        <tr>
            <td className="label">Website:</td>
            <td>{user.website}</td>
        </tr>
        <tr>
            <td className="label">Email:</td>
            <td>{user.email}</td>
        </tr>
    </table>

    
        <h1>Company</h1>
        <table>
        <tr>
            <td className="label">Name:</td>
            <td> {user.company.name}</td>
        </tr>
        <tr>
            <td className="label">Bs:</td>
            <td> {user.company.bs}</td>
        </tr>
        <tr>
            <td className="label">CatchPhrase:</td>
            <td> {user.company.catchPhrase}</td>
        </tr>
    </table>
        
    
    
        <h1>Address</h1>
        <table>
        <tr>
            <td className="label">address:</td>
            <td> {`${user.address.city}, ${user.address.zipcode}, ${user.address.street},${user.address.suite}`}</td>
        </tr>
        <tr>
            <td className="label">Coordinates:</td>
            <td> {`${user.address.geo.lat},${user.address.geo.lng}`}</td>
        </tr>

    </table>
    </div>
    </>)
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
// 
//email: "Sincere@april.biz"
// id: 1
// name: "Leanne Graham"
// phone: "1-770-736-8031 x56442"
// username: "Bret"
// website: "hildegard.org"