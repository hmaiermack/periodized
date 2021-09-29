import { auth } from './shared/firebaseSetup'
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import { useModal } from './context/ModalContext';
import {NewProgramModal} from './components/NewProgramModal/NewProgramModal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import RegisterPage from './pages/RegisterPage';  
import Sidebar from './components/nav/Sidebar';


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
                {/* container */}
                <div className="flex h-full">
                <Sidebar username="user" currentProgramId="1234"/>
                {/* content container */}
                <div className="flex flex-grow flex-col items-center">
                    <div>
                        Authenticated!
                        <button onClick={signOut} style={{display: 'block'}}>Sign Out</button>
                        <button onClick={getUser} style={{display: 'block'}}>Get user info</button>
                        <button onClick={deleteUser} style={{display: 'block'}}>Delete user</button>
                    </div>
                </div>
                </div>
                <NewProgramModal />
                <ReactQueryDevtools initialIsOpen={false} />
            </Router>
        </QueryClientProvider>
    )
}

export default AuthenticatedApp