import { prop, Ref, getModelForClass, mongoose, DocumentType, modelOptions } from '@typegoose/typegoose';
import { UserClass } from './User.model';
import { ProgramClass } from './Program.model';
import { WorkoutBlocksClass } from './WorkoutBlocks.model'

@modelOptions({ schemaOptions: {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    collection: 'TrainingBlocks'
  }})  
export class TrainingBlocksClass {

    @prop()
    name!: string;

    //just a reference to a user should be ok here, can't think of any benefits to referencing
    //a program
    @prop({ ref:'UserClass', type: () => String})
    public user!:  Ref<UserClass, string>;

    @prop({ ref: () => WorkoutBlocksClass})
    public workoutBlocks!: Ref<WorkoutBlocksClass>[];
  
  
}

export const TrainingBlocksModel = getModelForClass(TrainingBlocksClass)