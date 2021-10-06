import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useModal } from '../../context/ModalContext'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router'
import { useAuth } from '../../provider/AuthProvider'
import { useCreateProgram } from './useCreateProgram'
import { queryClient } from '../../App'

interface IFormInput {
    Name: string
}

const programNameSchema = yup.object().shape({
    Name: yup.string().max(20).required()
})

export const NewProgramModal = () => {
    const history = useHistory()
    const { mutateAsync, isMutating, isError } = useCreateProgram()
    const {state, dispatch} = useModal()

    const user = useAuth()
    
    const { isOpen, modalId } = state

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<IFormInput>({
        resolver: yupResolver(programNameSchema)
    });

    const onSubmit = async (input: IFormInput, userId: string | undefined) => {
        const res = await mutateAsync({name: input.Name, userId})
        setValue('Name', '')
        dispatch({type: 'close'})
        history.push(`/programs/${res?.program.id}`)
    }

    const handleCancel = () => {
        setValue('Name', '')
        dispatch({type: 'close'})
    }

    return modalId === 'newprogram' ? (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog onClose={() => dispatch({type: 'close'})} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center sm:justify-center">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Give your new program a name!
                            </Dialog.Title>
                            <div>

                            {isError && 
                                <span className="text-red-600 text-sm"> Sorry, something went wrong. Please try again.</span>
                            }

                            <form onSubmit={handleSubmit(async (formData) => await onSubmit(formData, user?.uid))}>
                                <label htmlFor="Name" className={errors.Name ? "text-sm font-bold text-red-600 block" : "text-sm font-bold text-gray-600 block"}>Program Name</label>
                                {errors.Name && errors.Name?.message && <span role="alert">{errors.Name.message}</span>}
                                <input id="Name" type="text" {...register("Name", {required: true})} className={errors.Name ? "w-full p-2 border-2 border-red-600 rounded mt-1" : "w-full p-2 border border-gray-600 rounded mt-1" } />
                                <div className="mx-auto px-4 py-3 sm:px-0 sm:flex sm:flex-row-reverse sm:justify-between">
                                    <input
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-max sm:text-sm"
                                    value="Create new Program"
                                    />
                                    <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-max sm:text-sm"
                                    onClick={() => handleCancel()}
                                    >
                                    Cancel
                                    </button>
                                </div>

                            </form>

                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
    ) : null
}
