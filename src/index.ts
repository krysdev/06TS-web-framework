import { User } from './models/User';

// const user = new User({ id: 1 }); // UserProps interface allows to have the properties optional
// user.set({name:'AAA', age: 666})

const user = new User({ name: 'new record', age: 0 });

// user.save();



// // user.set({ name: 'ABC' });

// // console.log(user.get('name'));
// // console.log(user.get('age'));

// user.on('click', () => {});
// console.log(user)

// import axios from 'axios';

// // axios.post('http://localhost:3005/users', {
// //   name: 'XXXXX',
// //   age: 99,
// // });

// axios.get('http://localhost:3005/users');
