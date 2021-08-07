import { prop, Ref, getModelForClass, mongoose, DocumentType, modelOptions } from '@typegoose/typegoose';
import { UserClass } from './User.model';

@modelOptions({ schemaOptions: {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    collection: 'Workouts'
  }})  
export class WorkoutClass {

    @prop()
    public name!: string;
    
    @prop({ ref:'UserClass', type: () => String})
    public user!:  Ref<UserClass, string>;

    @prop({
        type: () => [ProgressionRule]
    })
    public progressionRules?: ProgressionRule[];
  
    @prop({
        type: () => [Exercise]
    })
    public exercises!: Exercise[];

}

class ExerciseData {

    @prop()
    public weight!: number;

    @prop()
    public reps!: number;

}

enum ProgressionType {
    CONSTANT = 'constant',
    PERCENTAGE = 'percentage'
}

enum ProgressionFrequency {
    EVERY = 'every',
    EVERY_OTHER = 'every_other',
}

class ProgressionRule {

    @prop()
    public description!: string;

    @prop({
        enum: ProgressionType
    })
    public progressionType!: ProgressionType;

    @prop()
    public progressionAmount!: number;

    @prop({
        enum: ProgressionFrequency
    })
    public progressionFrequency!: ProgressionFrequency;

}

class Exercise {

    @prop()
    public name!: string;

    @prop()
    public sets!: string;
    
    @prop()
    public reps!: string;

    @prop({type: () => ProgressionRule})
    public progressionRule?: ProgressionRule;

    @prop({
         _id: false, type: () => [ExerciseData]
    })
    public mostRecentExerciseData?: ExerciseData[]
}

export const WorkoutModel = getModelForClass(WorkoutClass)