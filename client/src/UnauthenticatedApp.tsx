import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { auth } from '../src/firebaseSetup'
import RegisterPage from './pages/RegisterPage';


interface Props {
    
}

const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        "hmaiermack@gmail.com",
        "candid55"
      );
    } catch (error) {
      console.error(error);
    }
  };

const UnauthenticatedApp = (props: Props) => {
    return (
      <Router>
            <Route path='/register'>
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