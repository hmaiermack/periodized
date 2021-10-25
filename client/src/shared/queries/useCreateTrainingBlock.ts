import { createNewTrainingBlock } from "../api";
import { useMutation } from "react-query";

export const useCreateTrainingBlock = () => {

    const { mutateAsync, isLoading: isMutating, isError } = useMutation(createNewTrainingBlock)
    return { mutateAsync, isMutating, isError }
}