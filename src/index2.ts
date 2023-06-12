import { UserEdit } from './views/UserEdit';
import { User } from './models/User';
// import { UserForm } from './views/UserForm';

const user = User.buildUser({ name: 'NAME', age: 20 });

const element = document.getElementById('root');
// type guard (exclude 'null' case ->  const element: HTMLElement | null )
if (element) {
  const userEdit = new UserEdit(element, user);
  userEdit.render();
} else {
  console.log(`Cant't get the HTML element by ID`);
}

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
