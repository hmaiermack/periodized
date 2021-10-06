import { INewProgramFields } from "./apiTypes"
import { currentUserToken } from "./currentUser"

const apiUrl = process.env.REACT_APP_API_URL

export const getUser = async () => {
    const token = await currentUserToken()
    const res = await fetch(`${apiUrl}/user`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error("Something went wrong.")
    }

    return res.json()

}


export const createNewProgram = async (data: INewProgramFields) => {
    const token = await currentUserToken()


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

export const getProgramById = async (id: string) => {
    const token = await currentUserToken()

    const res = await fetch(`${apiUrl}/programs/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error("Something went wrong.")
    }

    return res.json()

}