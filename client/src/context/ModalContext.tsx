import React, { createContext, useContext, useReducer } from "react";

type ModalProviderProps = {children: React.ReactNode}

type Action = {type: 'open', payload: string} | {type: 'close'}
type Dispatch = (action: Action) => void
type ModalState = {
    isOpen: boolean,
    modalId: string | null
}
const ModalContext = createContext<
    {state: ModalState; dispatch: Dispatch} | undefined
>(undefined)

function modalReducer(state: ModalState, action: Action) {
    switch (action.type) {
        case 'open': {
            return {
                isOpen: true,
                modalId: action.payload,
            }
        }
        case 'close': {
            return {
                isOpen: false,
                modalId: null
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}


function ModalProvider({children}: ModalProviderProps) {

    const [state, dispatch] = useReducer(modalReducer, { isOpen: false, modalId: null })

    const value = { state, dispatch}

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )

}

function useModal() {
    const context = useContext(ModalContext)

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export {ModalProvider, useModal}