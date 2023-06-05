import { User } from './models/User';

const user = User.buildUser({ id: 1 });

user.on('change', () => {
  console.log(user.attributes.data);
});

user.fetch()

// user.save()

// user.set({ name: 'ABC' });

// console.log(user.get('name'))
// console.log(user.get('age'));

// console.log(user)

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
