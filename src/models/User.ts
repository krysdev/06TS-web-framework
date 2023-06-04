import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios'; // type

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
  // it is not called here, the arguments will be passed through i.e.  user.on('click', () => {console.log('clicked')})
  get on() {
    return this.events.on; // there are no '()', we refer to this method like to a property
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }

  // anytime we call 'set' we update the data in Attributes and we trigger a 'change' event (in Eventing)
  // this change allows other parts of the application to update also
  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  // this method passes the job to the 'fetch' in 'Sync' and works with the response here
  fetch(): void {
    // 'id' is required to fetch properly from the DB
    const id = this.get('id'); // or this.attributes.get('id') - it doesn't matter in this case
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    // fetch the info and then set it in Attribiutes (to create an instance of User)
    // it's a promise, so '.then'
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // update the User class properties with the fetched ones
      // it passes the response.data to the 'set' method here in this class (User)
      this.set(response.data);
      // you could use 'this.attributes.set', but the 'set' from here combines the 'set' from Attributes and 'trigger' from Eventing
    });
  }
}
