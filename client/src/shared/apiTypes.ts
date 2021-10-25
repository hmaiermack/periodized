export interface INewProgramFields {
    userId: string | undefined,
    name: string
}

export interface INewTrainingBlockFields {
    userId: string | undefined,
    programId: string,
    name: string
}