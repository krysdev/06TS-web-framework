// import { User } from './models/User';

// const user = new User({name: 'XXX', age: 99}); // UserProps interface allows to have the properties optional

// // user.set({ name: 'ABC' });

// // console.log(user.get('name'));
// // console.log(user.get('age'));

// user.on('click', () => {});
// console.log(user)

import axios from 'axios';

// axios.post('http://127.0.0.1:3005/users', {
//   name: 'XXXXX',
//   age: 99,
// });

axios.get('http://localhost:3005/users');
