import React from 'react'
import { auth } from '../src/firebaseSetup'

type Props = {
    
}

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
        }
    }).then(res => res.json())
    .then(json => console.log(json))
}

const AuthenticatedApp = (props: Props) => {
    return (
        <div>
            Authenticated!
            <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
            <button onClick={createUser} style={{display: 'block'}}>Create a user</button>
        </div>
    )
}

export default AuthenticatedApp