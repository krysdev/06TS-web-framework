// attributes - stores properties tied to the user (name, age, etc)
// sync - saves this person's data to a remote server and then retreive it (save, fetch)

import { Eventing } from './Eventing';

export interface UserProps {
  name?: string; // optional property
  age?: number; // optional property
  id?: number;
}

export class User {
  // events - informs other parts of our application that data tied to a particular user is changed (on, trigger)
  public events: Eventing = new Eventing();

  // 'data' is an object
  constructor(private data: UserProps) {}

  // a method to get a User's property
  // propName is a string of: 'name' or 'age' or 'id'
  get(propName: string): number | string {
    return this.data[propName];
  }

  // a method to change the User's property(ies)
  // 'update' is an object (updates 'data')
  set(update: UserProps): void {
    // overwrite the 'data' properties with the 'update' properties
    Object.assign(this.data, update);
  }
}
