import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const UnauthenticatedApp = () => {
    return (
      <Router>
          <Switch>
            <Route exact path='/register'>
                <RegisterPage />
            </Route>
            <Route exact path='/login'>
                <LoginPage />
            </Route>
            <div>
                Unauthenticated :|
            </div>
            </Switch>
        </Router>
    )
}

export default UnauthenticatedApp