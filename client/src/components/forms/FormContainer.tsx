
interface IFormContainerProps {
    title: string,
    subtitle: string,
    children?: React.ReactNode
}

const FormContainer = ({ title, subtitle, children }: IFormContainerProps) => {
    return (
        <div className="container">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-bold text-3xl text-pOrange-400 uppercase">{title}</div>
                    <div className="text-xl font-medium text-pGrey-400 m-2 text-center">{subtitle}</div>
                </div>
                <div className="max-w-md w-full mx-auto bg-white p-8 border border-pGrey-600 rounded">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormContainer
