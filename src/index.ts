import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';

const collection = new Collection<User, UserProps>(
  'http://localhost:3005/users',
  (json: UserProps) => User.buildUser(json)
);

collection.on('change', () => {
  console.log(collection);
});

collection.fetch();

//

//

///////////// how 'this' works in JS

// const colours = {
//   colour: 'red',
//   print() {
//     console.log(this.colour);
//   },
// };

// colours.print(); // 'this' points to the left, so to the 'colours' object

// const print = colours.print;
// print(); // there is nothing on the left, so 'this' is 'undefined'
