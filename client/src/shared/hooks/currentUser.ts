import { auth } from '../../firebaseSetup'
  

export const useCurrentUser = async () => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken())

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}