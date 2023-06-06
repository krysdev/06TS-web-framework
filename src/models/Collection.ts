import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// generic class
// T is a generic type for models
// K is a generic type for json data that we get back (the data here has: id, name, age)
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  // deserialize takes json data and returns an instance of a Model
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  // getters (accessors)
  // the mehtods are defined differently than in 'Models' (not shorten syntax but through getters) because
  // initializing a property this way: [ events: Eventing = new Eventing() ] would otherwise cause a bug after compiling to ES5
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      // response.data is an array of objects
      response.data.forEach((value: K) => {
        // for each record we turn it into a 'User' instance and add to the 'models' array
        this.models.push(this.deserialize(value));
      });

      this.trigger('change');
    });
  }
}
