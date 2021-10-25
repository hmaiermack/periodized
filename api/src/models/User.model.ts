import { getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { ProgramClass } from './Program.model'


@modelOptions({ schemaOptions: {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
  collection: 'Users'
}})
export class UserClass {
  @prop()
  public _id!: string;

  @prop({ 
    unique: true 
  })
  public username!: string;

  @prop({ref: () => ProgramClass})
  public currentProgram?: Ref<ProgramClass>
}

