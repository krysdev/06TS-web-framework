type Callback = () => void;

export class Eventing {
  // 'events' is an array of different callback functions registered for each event (we iterate through this array and call each of the callbacks)
  // 'key' is a name of an event (click, hover etc.) and it has to be a string
  // <  this.events['click'] = [ func ]  >
  events: { [key: string]: Callback[] } = {}; // initialize as an empty object

  // on = (eventName, Callback)=>{} - arrow function
  on = (eventName: string, callback: Callback): void => {
    // if there is no event handler when we create a 'User' (it's undefined), then we create an empty array
    const handlers = this.events[eventName] || []; // either way 'handlers' is an array
    // add a new callback function to the array
    handlers.push(callback);
    // assign the handlers to the object
    this.events[eventName] = handlers;
  }

  // arrow function
  trigger = (eventName: string): void => {
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
