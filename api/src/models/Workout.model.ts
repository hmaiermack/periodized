import { prop, Ref, getModelForClass, mongoose, DocumentType, modelOptions } from '@typegoose/typegoose';
import { UserClass } from './User.model';

@modelOptions({ schemaOptions: {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    collection: 'Workouts'
  }})  
export class WorkoutClass {

    @prop()
    name!: string;
    
    @prop({ ref:'UserClass', type: () => String})
    public user!:  Ref<UserClass, string>;
  
    @prop({
        _id: false
    })
    exercises!: Exercise[];

  
}

class Exercise {
    @prop()
    name!: string;

    @prop()
    sets!: string;
    
    @prop()
    reps!: string;
}

export const WorkoutModel = getModelForClass(WorkoutClass)