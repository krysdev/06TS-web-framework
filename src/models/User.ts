interface UserProps {
  name?: string; // optional property
  age?: number; // optional property
}

type Callback = () => void;

export class User {
  // 'events' is an array of different callback functions registered for each event (we iterate through this array and call each of the callbacks)
  // 'key' is a name of an event (click, hover etc.) and it has to be a string
  // <  this.events['click'] = [ ()=>{} ]  >
  events: { [key: string]: Callback[] } = {}; // initialize as an empty object

  // 'data' is an object
  constructor(private data: UserProps) {}

  // propName is a string of: 'name' or 'age'
  get(propName: string): number | string {
    return this.data[propName];
  }

  // 'update' is an object (updates 'data')
  set(update: UserProps): void {
    // overwrite the 'data' properties with the 'update' properties
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    // if there is no event handler when we create a 'User' (it's undefined), then we create an empty array
    const handlers = this.events[eventName] || []; // either way 'handlers' is an array
    // add a new callback function to the array
    handlers.push(callback);
    // assign the handlers to the object
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    // check if 'handlers' is defined
    if (!handlers || handlers.length === 0) {
      return;
    }

    // else - go through the array and call each function
    handlers.forEach((callback) => {
      callback();
    });
  }
}
