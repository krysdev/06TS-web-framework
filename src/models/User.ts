interface UserProps {
  name: string;
  age: number;
}

export class User {
  // 'data' is an object
  constructor(private data: UserProps) {}

  // propName (name/age)
  get(propName: string): number | string {
    return this.data[propName];
  }

  // 'update' is an object (updates 'data')
  set(update: UserProps): void {
    // overwrite the 'data' properties with the 'update' properties
    Object.assign(this.data, update);
  }
}
