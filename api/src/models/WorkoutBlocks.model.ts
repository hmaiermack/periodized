import { prop, Ref, getModelForClass, mongoose, DocumentType, modelOptions } from '@typegoose/typegoose';
import { UserClass } from './User.model';
import { WorkoutClass } from './Workout.model';

@modelOptions({ schemaOptions: {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    collection: 'WorkoutBlocks'
  }})  
export class WorkoutBlocksClass {

    @prop()
    name!: string;
    
    @prop({ ref:'UserClass', type: () => String})
    public user!:  Ref<UserClass, string>;
  
    @prop({ ref: () => WorkoutClass})
    public workouts!: Ref<WorkoutClass>[];

  
}

export const WorkoutBlocksModel = getModelForClass(WorkoutBlocksClass)