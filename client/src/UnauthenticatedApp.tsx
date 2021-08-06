import React from 'react'
import { auth } from '../src/firebaseSetup'


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
        <div>
            Unauthenticated :|
            <button onClick={signIn} style={{display: 'block'}}> Sign In </button>
        </div>
    )
}

export default UnauthenticatedApp