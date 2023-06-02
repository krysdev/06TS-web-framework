// keys of an object are strings, strings can be types, so keys can be types in TypeScript

export class Attributes<T extends object> {
  // 'data' is an object
  constructor(private data: T) {}

  // a method to get a User's property
  // propName is a string of: 'name' or 'age' or 'id'
  get(propName: string): number | string {
    return this.data[propName];
  }

  // a method to change the User's property(ies)
  // 'update' is an object (updates 'data')
  set(update: T): void {
    // overwrite the 'data' properties with the 'update' properties
    Object.assign(this.data, update);
  }
}
