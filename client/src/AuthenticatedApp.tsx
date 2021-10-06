import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import {NewProgramModal} from './components/NewProgramModal/NewProgramModal';
import { ReactQueryDevtools } from 'react-query/devtools'
import RegisterPage from './pages/RegisterPage';  
import Sidebar from './components/nav/Sidebar';
import { useQuery } from "react-query";
import { getUser } from "./shared/api"

const AuthenticatedApp = () => {
    const {status, data, error } = useQuery('user', getUser)
    console.log("authapp" + data);

    return (
            <Router>
                {/* container */}
                <div className="flex h-full">
                <Sidebar username="user" currentProgramId="1234"/>
                {/* content container */}
                <div className="flex flex-grow flex-col items-center bg-gray-200">
                    <div>
                        Authenticated!
                    </div>
                </div>
                </div>
                <NewProgramModal />
                <ReactQueryDevtools initialIsOpen={false} />
            </Router>
    )
}

export default AuthenticatedApp