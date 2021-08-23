import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const UnauthenticatedApp = () => {
    return (
      <Router>
            <Route exact path='/register'>
                <RegisterPage />
            </Route>
            <Route exact path = '/login'>
                <LoginPage />
            </Route>
        <div>
            Unauthenticated :|
        </div>
        </Router>
    )
}

export default UnauthenticatedApp