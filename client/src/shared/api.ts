import { INewProgramFields } from "./apiTypes"
import { currentUserToken } from "./currentUser"

const apiUrl = process.env.REACT_APP_API_URL
const token = currentUserToken()

export const createNewProgram = async (data: INewProgramFields) => {

    const response = await fetch(`${apiUrl}/programs`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        throw new Error("Something went wrong")
    }
    
    return response.json()
}