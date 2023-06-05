export class Attributes<T extends object> {
  // 'data' is an object
  constructor(private data: T) {}

  // We can use generics with class methods too
  // 'get' is a method to obtain a User's property value
  // 'key' is a string : 'name' 'age' or 'id'
  // This is a generics constraint. It limits the type that K can be (limits what the argument 'key' can be)
  // Keys of an object are strings, strings can be types, so keys can be types in TypeScript (see at the bottom)
  // <K extends keyof T> So the type of K can only be one of the keys of the object T and it will be a fixed string
  // (i.e. if T is UserProps then the keys of the object are 'name' 'age' or 'id' )
  // Whatever argument we pass in as a 'key' it has to be a type of K
  // It has to return T[K] - it is a normal object look up: object[property]
  // So look up the interface T and return the value of the key/property at K (for 'id' it will be 'number', for 'name' 'string' etc.)
  
  // get<K extends keyof T>(key: K): T[K] {          --->   get(key){}   changed to arrow   get = (key)=>{}
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  // a method to change the User's property(ies)
  // 'update' is an object (updates 'data')
  set(update: T): void {
    // overwrite the 'data' properties with the 'update' properties
    Object.assign(this.data, update);
  }

  // returns the whole data object (not just one property like 'get')
  getAll(): T {
    return this.data;
  }

}

// Strings can be types so:
//   type someWord: 'word'
// and if the type 'someWord' is used, then the value cannot be different than 'word'.
// Any other thing will throw an error.