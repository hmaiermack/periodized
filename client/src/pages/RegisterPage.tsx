import React from 'react'

const RegisterPage = () => {
    return (
        <div className="container">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-bold text-3xl text-pOrange-400 uppercase">Register</div>
                    <div className="text-xl font-medium text-pGrey-400 m-2 text-center">Register</div>
                </div>
                <div className="max-w-md w-full mx-auto bg-white p-8 border border-pGrey-600 rounded">
                    <form action="" className="space-y-6">
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Username</label>
                            <input type="text" className="w-full p-2 border border-pGrey-600 rounded mt-1" />
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                            <input type="text" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="jdoe@example.com" />
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Password</label>
                            <input type="password" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="********"/>
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Confirm Password</label>
                            <input type="password" className="w-full p-2 border border-pGrey-600 rounded mt-1" placeholder="********"/>
                        </div>

                        <button className="w-full py-2 bg-pBlue-400 hover:bg-pBlue-600 rounded-md text-pGrey-400 text-lg font-bold">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
