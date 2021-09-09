import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { auth } from '../shared/firebaseSetup';
import FormInput from '../components/forms/FormInput';
import { useHistory, Link } from 'react-router-dom';
import { createUser } from '../services/user/createUser';
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
    Username: yup.string().required(),
    Email: yup.string().email().required(),
    Password: yup.string().password().required(),
    Confirmation: yup.string().oneOf([yup.ref("Password")], 'Passwords must match.')
})

const RegisterPage = () => {
    const history = useHistory()

    const { register, setError, formState: { errors }, handleSubmit } = useForm<IFormInputs>({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler: SubmitHandler<IFormInputs> = async (input: IFormInputs) => {

        const success = await createUser(input.Username, input.Email, input.Password, setError)

        console.log(success);

        if(success){
            const signedIn = await auth.signInWithEmailAndPassword(input.Email, input.Password)
            if(signedIn) {
                history.push('/')
            } else {
                history.push('/login')
        }}
    }

    return (
        <div className="container">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-bold text-3xl text-pOrange-400 uppercase">Register</div>
                    <div className="text-xl font-medium text-pGrey-400 m-2 text-center">Register</div>
                </div>
                <div className="max-w-md w-full mx-auto bg-white p-8 border border-pGrey-600 rounded">
                    <form onSubmit={handleSubmit(async (formData) => await submitHandler(formData))} className="space-y-6">
                        <FormInput label="Username" register={register} errors={errors.Username} required={true}>
                            {errors.Username && errors.Username?.message && <span>{errors.Username.message}</span>}
                        </FormInput>
                        <FormInput label="Email" register={register} errors={errors.Email} required={true}>
                            {errors.Email && errors.Email?.message && <span>{errors.Email.message}</span>}
                        </FormInput>
                        <FormInput label="Password" register={register} errors={errors.Password} required={true}>
                            {errors.Password && errors.Password?.message && <span>{errors.Password.message}</span>}
                        </FormInput>
                        <FormInput label="Confirmation" register={register} errors={errors.Confirmation} required={true}>
                            {errors.Confirmation && errors.Confirmation?.message && <span>{errors.Confirmation.message}</span>}
                        </FormInput>

                        <input type="submit" className="w-full py-2 bg-pBlue-400 hover:bg-pBlue-600 rounded-md text-pGrey-400 text-lg font-bold"></input>
                        <span className="mt-4 text-xs text-gray-500">Already have an account? <Link to ="/login" className="cursor-pointer hover:text-pOrange-400">Log In</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
