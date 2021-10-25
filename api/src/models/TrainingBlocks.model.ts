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

    @prop({ ref:'UserClass', type: () => String})
    public user!:  Ref<UserClass, string>;

    @prop({ ref: () => ProgramClass})
    public program!:  Ref<ProgramClass>;

    @prop({ ref: () => WorkoutBlocksClass})
    public workoutBlocksSeries?: Ref<WorkoutBlocksClass>[];
}
