import { Dialog } from '@headlessui/react'
import { useModal } from '../context/ModalContext'

const NewProgramModal = () => {
    const {state, dispatch} = useModal()
    
    const {isOpen} = state

    return (
        <Dialog open={isOpen} onClose={() => dispatch({type: 'close'})}>
            <Dialog.Title>Modal is open!</Dialog.Title>
            <Dialog.Description>{state.modalId}</Dialog.Description>
        </Dialog>
    ) 
}

export default NewProgramModal
