import { UseFormSetError } from "react-hook-form";
export const createUser = async (username: string, email: string, password: string, setError: UseFormSetError<any>): Promise<Boolean> => {
    try {
        const create = await fetch('http://localhost:1337/api/users/register', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                email: email,
                password: password
            })
        })
    
        console.log('response ok?', create.ok);
    
        if(!create.ok) {
           const response = await create.json()
           const message = response.message
           console.log(message);
           if(message === "Username is taken."){ 
               console.log('username error');
               setError("Username", {
                type: "manual",
                message: "Username is already in use."
               })
            } else if (message.includes("email")) {
                console.log('email error');
                setError("Email", {
                 type: "manual",
                 message: "Email is already in use."
                })
            } else {
                throw new Error('Something went wrong creating your account, please try again.')
            }
    
            return false
        }
    
        return true
    } catch(e) {
        console.log(e)
        return false
    }

}