import { AxiosPromise, AxiosResponse } from 'axios';

// generic interface
interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

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
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  // this method passes the job to the 'fetch' in 'Sync' and works with the response back here
  fetch(): void {
    // 'id' is required to fetch properly from the DB
    const id = this.get('id'); // or    this.attributes.get('id') - it doesn't matter in this case
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    // fetch the info and then set it in Attribiutes (to create an instance of User)
    // it's a promise, so '.then'
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // update the User class properties with the fetched ones
      // it passes the response.data to the 'set' method here in this class
      this.set(response.data);
      // you could use 'this.attributes.set', but the 'set' from here combines the 'set' from Attributes and 'trigger' from Eventing
    });
  }

  save(): void {
    // get all properties, pass it to sync.save
    this.sync.save(this.attributes.getAll())
      // after successful saving we can trigger a 'save' event, so the rest of the app knows about it too
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      // and to handle an error
      .catch(() => {
        this.trigger('error');
      });
  }
}
