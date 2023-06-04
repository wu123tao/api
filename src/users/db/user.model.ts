import { Prop } from '@typegoose/typegoose';

export class User {
  @Prop()
  account: string;

  @Prop()
  userName: string;

  @Prop()
  password: string;
}
