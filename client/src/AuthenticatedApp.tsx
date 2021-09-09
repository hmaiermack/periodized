import { auth } from './shared/firebaseSetup'
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import { useModal } from './context/ModalContext';
import NewProgramModal from './components/NewProgramModal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'


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
const queryClient = new QueryClient()

const AuthenticatedApp = () => {
    const {state, dispatch} = useModal()

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                    <span className="font-bold text-2xl text-red-500">{state.isOpen ? 'isOpen is true' : 'isOpen is false'}</span>
                    <div>
                        Authenticated!
                        <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
                        <button onClick={getUser} style={{display: 'block'}}>Get user info</button>
                        <button onClick={deleteUser} style={{display: 'block'}}>Delete user</button>
                    </div>
                </div>
            <button onClick={() => dispatch({type: 'open', payload: 'newprogram'})}>
                new program
            </button>
            <NewProgramModal />
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AuthenticatedApp