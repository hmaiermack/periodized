import { createNewProgram } from "../../shared/api";
import { useMutation } from "react-query";
import { useModal } from "../../context/ModalContext";

export const useCreateProgram = () => {

    const { mutateAsync, isLoading: isMutating, isError } = useMutation(createNewProgram)
    return { mutateAsync, isMutating, isError }
}

export {}