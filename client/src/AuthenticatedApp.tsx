import React from 'react'
import { auth } from '../src/firebaseSetup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
  


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

const deleteUser = async () => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken())

    fetch('http://localhost:1337/api/users/delete', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
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
    .then(json => JSON.parse(json))
    .then(data => console.log(data))
}

const AuthenticatedApp = () => {
    return (
        <Router>
            <Route path='/register'>
                <RegisterPage />
            </Route>
        <div>
            Authenticated!
            <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
            <button onClick={createUser} style={{display: 'block'}}>Create a user</button>
            <button onClick={getUser} style={{display: 'block'}}>Get user info</button>
            <button onClick={deleteUser} style={{display: 'block'}}>Delete user</button>
        </div>
        </Router>
    )
}

export default AuthenticatedApp