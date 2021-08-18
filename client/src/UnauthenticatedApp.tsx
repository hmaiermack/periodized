import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { auth } from '../src/firebaseSetup'
import RegisterPage from './pages/RegisterPage';


interface Props {
    
}

const signIn = async () => {
      await auth.signInWithEmailAndPassword(
        "test@test.com",
        "Testpassword!1"
      );
  };

const UnauthenticatedApp = (props: Props) => {
    return (
      <Router>
            <Route exact path='/register'>
                <RegisterPage />
            </Route>
        <div>
            Unauthenticated :|
            <button onClick={signIn} style={{display: 'block'}}> Sign In </button>
        </div>
        </Router>
    )
}

export default UnauthenticatedApp