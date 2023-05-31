import { User } from './models/User';

const user = new User({ name: 'NAME XXX', age: 20 });

console.log(user.get('name'));

