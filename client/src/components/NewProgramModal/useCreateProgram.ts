import { createNewProgram } from "../../shared/api";
import { useMutation } from "react-query";

export const useCreateProgram = () => {

    const { mutateAsync, isLoading: isMutating, isError } = useMutation(createNewProgram)
    return { mutateAsync, isMutating, isError }
}