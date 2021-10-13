import { getProgramById } from "../api";
import { useQuery } from "react-query";

export const useGetProgramById = (programId: string) => {
    const { 
        isLoading: isFetching, 
        isError, 
        data, 
        error 
    } = useQuery(['selectedProgram', programId], () => getProgramById(programId))

    return { isFetching, isError, data, error}
}