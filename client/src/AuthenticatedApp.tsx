import React from 'react'
import { auth } from '../src/firebaseSetup'


const signOut = async () => {
    await auth.signOut()
}

const createUser = async () => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken());

    fetch('http://localhost:1337/api/users/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username: 'username'})
    }).then(res => res.json())
    .then(json => console.log(json))
}

const getUser = async () => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken());

    fetch('http://localhost:1337/api/users/get', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
    .then(json => console.log(json))
}

const AuthenticatedApp = () => {
    return (
        <div>
            Authenticated!
            <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
            <button onClick={createUser} style={{display: 'block'}}>Create a user</button>
            <button onClick={getUser} style={{display: 'lbock'}}>Get user info</button>
        </div>
    )
}

export default AuthenticatedApp