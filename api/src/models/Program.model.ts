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
  public startDate!: Date;

  @prop({
    //REVISIT
    //default to 6 months to give a cutoff date for recurring events
    //this may not be the best architecture to handle this problem
    default: function (this: DocumentType<ProgramClass>) {
      return add(this.startDate, {months: 6})
    }
  })
  public endDate!: Date;

  //is this even needed? could be done on front end
  //also could just be frivolous information
  public get duration(){
    return differenceInDays(this.endDate, this.startDate)
  }

  @prop({ ref: () => TrainingBlocksClass})
  public trainingBlocks!: Ref<TrainingBlocksClass>[];

}

export const ProgramModel = getModelForClass(ProgramClass)