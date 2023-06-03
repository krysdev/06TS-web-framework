import { User } from './models/User';

// const user = new User({ id: 1 }); // UserProps interface allows to have the properties optional
// user.set({name:'AAA', age: 666})

const user = new User({ name: 'new record', age: 0 });

console.log(user.get('name'))

user.on('change', () => {
  console.log('user changed');
});

user.set({ name: 'ABC' });

console.log(user.get('name'))
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
