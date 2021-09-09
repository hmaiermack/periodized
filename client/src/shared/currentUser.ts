import { auth } from './firebaseSetup'
  

export const currentUserToken = async () => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken())

    return token
}