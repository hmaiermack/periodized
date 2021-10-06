import React from 'react';
import {useAuth} from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query';


//Render Authenticated or Unauthenticated pattern from https://kentcdodds.com/blog/authentication-in-react-applications
const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

export const queryClient = new QueryClient()
  

function App() {
  const authenticated = useAuth()


  //pre-load the authenticated app in the background while auth is happening
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  React.useEffect(() => {
    async function testMsw() {
      const res = await fetch('/healthcheck')
      console.log(res.json())
    }
    testMsw()
  }, [])

  //Will never render Authenticated app components routes etc if no user logged in.
  return (
    <React.Suspense fallback={<span>suspenseful</span>}>
      <QueryClientProvider client={queryClient}>
      {authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </QueryClientProvider>
    </React.Suspense>
    )
}

export default App;
