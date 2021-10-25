//needed to handle circular dependency issue
//https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes#circular-dependencies
import { getModelForClass } from "@typegoose/typegoose";
import { ProgramClass } from "./Program.model";
import { TrainingBlocksClass } from "./TrainingBlocks.model";
import { UserClass } from "./User.model";
import { WorkoutBlocksClass } from "./WorkoutBlocks.model";
import { WorkoutClass } from "./Workout.model";

export const User = getModelForClass(UserClass)
export const ProgramModel = getModelForClass(ProgramClass)
export const TrainingBlocksModel = getModelForClass(TrainingBlocksClass)
export const WorkoutBlocksModel = getModelForClass(WorkoutBlocksClass)
export const WorkoutModel = getModelForClass(WorkoutClass)