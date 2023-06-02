// attributes - stores properties tied to the user (name, age, etc)


import { Eventing } from './Eventing';
import { Sync } from './Sync';

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

  
}
