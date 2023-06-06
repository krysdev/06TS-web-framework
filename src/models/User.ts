import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';

export interface UserProps {
  name?: string; // optional property (in a strict mode it is: string | undefined)
  age?: number; // optional property
  id?: number;
}

const rootUrl = 'http://localhost:3005/users';

export class User extends Model<UserProps> {
  // to add a user call this static and pass the properties (attrs)
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
}
