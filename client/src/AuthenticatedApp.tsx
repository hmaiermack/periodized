import { auth } from '../src/firebaseSetup'
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';  


const signOut = async () => {
    await auth.signOut()
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
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div>
                    Authenticated!
                    <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
                    <button onClick={getUser} style={{display: 'block'}}>Get user info</button>
                    <button onClick={deleteUser} style={{display: 'block'}}>Delete user</button>
                </div>
            </div>
        </Router>
    )
}

export default AuthenticatedApp