import axios, { AxiosPromise } from 'axios'; // AxiosPromise is a type

// this interface guarantees that the T type will always have the 'id' property
interface hasId {
  id?: number;
}

// generics constraint - the 'Sync' class can be only used with a type that has the 'id' property
export class Sync<T extends hasId> {
  // when creating an instnace of 'Sync' the URL argument is required: 'http://localhost:3005/users' (no slash at the end)
  constructor(public URL: string) {}

  fetch(id: number): AxiosPromise {
    // return the result of get (a promise), so the response can be used in User.ts
    return axios.get(`${this.URL}/${id}`);

    // .then((response: AxiosResponse): void => {
    //     // update the User class properties with the fetched ones
    //     this.set(response.data);
    //   });
  }

  save(data: T): AxiosPromise {
    const id = data.id;

    // check if we have to update the existing user or we need to create a new user (a case when no 'id' in the DB)
    // we return both cases (it's a promise), so we can use that object to determine the status of 'save'
    if (id) {
      return axios.put(`${this.URL}/${id}`, data); // update (REST PUT)
    } else {
      return axios.post(this.URL, data); // create a new record (REST POST)
    }
  }
}
