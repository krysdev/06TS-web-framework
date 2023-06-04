import { User } from './models/User';

// const user = new User({ name: 'new record', age: 0 });
const user = new User({ id: 1 });


user.on('change', () => {
  console.log(user);
});

user.fetch()


// user.set({ name: 'ABC' });

// console.log(user.get('name'))
// console.log(user.get('age'));

// console.log(user)

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
