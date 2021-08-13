import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import YupPassword from 'yup-password'
//extend yup
YupPassword(yup)

interface IFormInputs {
    username: string,
    email: string,
    password: string,
    confirmation: string
}

//need to add existing email validation

const registerSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    confirmation: yup.string().password().oneOf([yup.ref("password"), 'Passwords must match.'])
})

const RegisterPage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler: SubmitHandler<IFormInputs> = (input: IFormInputs) => {
        console.log("submit");
    }

    return (
        <div className="container">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-bold text-3xl text-pOrange-400 uppercase">Register</div>
                    <div className="text-xl font-medium text-pGrey-400 m-2 text-center">Register</div>
                </div>
                <div className="max-w-md w-full mx-auto bg-white p-8 border border-pGrey-600 rounded">
                    <form onSubmit={handleSubmit(data => console.log(data))} className="space-y-6">
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Username</label>
                            <input {...register("username")} type="text" className="w-full p-2 border border-pGrey-600 rounded mt-1" />
                            {errors.username?.type === 'required' && "Username is required"}
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                            <input {...register("email")} type="text" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="jdoe@example.com" />
                            {errors.email && errors.email?.message && <span>{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Password</label>
                            <input {...register("password")} type="password" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="********"/>
                            {errors.password && errors.password?.message && <span>{errors.password.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Confirm Password</label>
                            <input {...register("confirmation")} type="password" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="********"/>
                            {errors.confirmation && errors.confirmation?.message && <span>Passwords must match.</span>}
                        </div>

                        <input type="submit" className="w-full py-2 bg-pBlue-400 hover:bg-pBlue-600 rounded-md text-pGrey-400 text-lg font-bold"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
