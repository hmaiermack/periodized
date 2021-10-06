import { prop, Ref, getModelForClass, mongoose, DocumentType, modelOptions } from '@typegoose/typegoose';
import { add, differenceInDays } from 'date-fns'
import { UserClass } from './User.model';
import { TrainingBlocksClass } from './TrainingBlocks.model'

@modelOptions({ schemaOptions: {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
  collection: 'Programs'
}})
export class ProgramClass {
  @prop()
  public name!: string;

  @prop({ ref:'UserClass', type: () => String})
  public user!:  Ref<UserClass, string>;

  @prop()
  public startDate?: Date;

  @prop()
  public duration?: number;

  @prop({ ref: () => TrainingBlocksClass})
  public trainingBlocks?: Ref<TrainingBlocksClass>[];

}

export const ProgramModel = getModelForClass(ProgramClass)