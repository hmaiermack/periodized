import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { auth } from '../firebaseSetup';
import FormInput from '../components/forms/FormInput';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';
//extend yup
YupPassword(yup)

interface IFormInputs {
    Username: string,
    Email: string,
    Password: string,
    Confirmation: string
}


//need to add existing email validation

const registerSchema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().password().required()
})

const LoginPage = () => {
    const [loginError, setLoginError] = useState<null | string>(null)
    const history = useHistory()

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler: SubmitHandler<IFormInputs> = async (input: IFormInputs) => {
        setLoginError(null)
        await auth.signInWithEmailAndPassword(input.Email, input.Password)
                    .then(() => {
                        history.push('/')
                    })
                    .catch(e => {
                        switch (e.code) {
                            case 'auth/invalid-email':
                                setLoginError('That email is not valid.')
                                break
                            default:
                                setLoginError('The username or password you entered is incorrect.')
                        }
                    })
    }

    return (
        <div className="container">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-bold text-3xl text-pOrange-400 uppercase">Log In</div>
                </div>
                <div className="max-w-md w-full mx-auto bg-white p-8 border border-pGrey-600 rounded">
                    <form onSubmit={handleSubmit(async (formData) => await submitHandler(formData))} className="space-y-6">
                        <FormInput label="Email" register={register} errors={errors.Email} required={true}>
                            {errors.Email && errors.Email?.message && <span role="alert">{errors.Email.message}</span>}
                        </FormInput>
                        <FormInput label="Password" register={register} errors={errors.Password} required={true}>
                            {errors.Password && errors.Password?.message && <span role="alert">{errors.Password.message}</span>}
                        </FormInput>
                        <input type="submit" className="w-full py-2 bg-pBlue-400 hover:bg-pBlue-600 rounded-md text-pGrey-400 text-lg font-bold" value="Log In"></input>
                        { loginError && <span role="alert" className="mt-4 text-red-600 font-medium text-lg">{loginError}</span>}
                        <span className="block mt-4 text-xs text-gray-500 cursor-pointer hover:text-pOrange-400"><Link to="/register">Create an account</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
