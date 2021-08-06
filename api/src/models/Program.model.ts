import { prop, Ref, getModelForClass, mongoose } from '@typegoose/typegoose';
import { UserClass } from './User.model';


export class ProgramClass {
  @prop()
  public name!: string;

  @prop()
  public isCurrent!: boolean;

  @prop({ ref:'UserClass', type: () => String})
  public user!:  Ref<UserClass, string>
}

export const ProgramModel = getModelForClass(ProgramClass)