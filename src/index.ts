import { UserForm } from './views/UserForm';

const userForm = new UserForm(document.getElementById('root'));
// const userForm = new UserForm(document.querySelector('#root'));

userForm.render();

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
