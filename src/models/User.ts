import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
  name?: string; // optional property (in a strict mode it is: string | undefined)
  age?: number; // optional property
  id?: number;
}

const rootUrl = 'http://localhost:3005/users';

export class User {
  // events - informs other parts of our application that data tied to a particular user is changed (on, trigger)
  public events: Eventing = new Eventing();

  // sync - saves this person's data to a remote server and then retreive it (save, fetch)
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  // attributes - stores properties tied to the user (name, age, etc)
  public attributes: Attributes<UserProps>; // initialized through the constructor
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  // getters (accessors)
  // 'on' here is a reference to the 'on' method from the 'Eventing' class
  // it is not called here, the arguments will be passed through
  get on() {
    return this.events.on; // there are no '()', we refer to this method like to a property
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }
}
