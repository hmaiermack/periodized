import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import { useCallback } from "react";
import {NewProgramModal} from './components/NewProgramModal/NewProgramModal';
import { ReactQueryDevtools } from 'react-query/devtools'
import Sidebar from './components/nav/Sidebar';
import { useQuery } from "react-query";
import { getUser } from "./shared/api"
import EditProgramPage from "./pages/EditProgramPage";

const AuthenticatedApp = () => {
    const {status, data, error } = useQuery('user', getUser)

    return (
            <Router>
                {/* container */}
                <div className="flex h-full">
                <Sidebar username={data?.username} currentProgramId={data?.currentProgram} programList={data?.programs}/>
                {/* content container */}
                <div className="flex flex-grow flex-col items-center bg-gray-200">
                    <Switch>
                        <Route path="/programs/:id">
                            <EditProgramPage />
                        </Route>

                    </Switch>
                </div>
                </div>
                <NewProgramModal />
                <ReactQueryDevtools initialIsOpen={false} />
            </Router>
    )
}

export default AuthenticatedApp