import { User, UserProps } from '../models/User';
import { View } from './View';

// 'View' requires 2 type definitions to be passed in (see View.ts)
export class UserForm extends View<User, UserProps> {
  // an object of keys and values
  // the key is a string 'event_name:html_element_selector'
  // the value is the function to run
  eventsMap(): { [key: string]: () => void } {
    // so [the keys are strings] and the values : functions with no arguments and returning nothing
    return {
      'mouseenter:h1': this.onHeaderHover,
      'click:.set-age': this.onSetAgeClick, // class '.set-age'
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  // make it as an arrow function to avoid problems with the 'this' pointer later
  onSaveClick = (): void => {
    this.model.save();
  };

  onHeaderHover(): void {
    console.log('H1 was hovered over');
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input'); // <input>
    // when you hover over the 'const input' you will see inference -> const input: HTMLInputElement | null
    // so 'if' here works as a type guard (we exclude the null case)
    if (input) {
      const name = input.value; // hover over 'input'-> const input: HTMLInputElement
      this.model.set({ name }); // anytime we call 'set' it triggers the 'change' e
    }
  };

  onSetAgeClick = (): void => {
    // the method is in User.ts - 'model' is an instance of a 'User' (see the constructor)
    this.model.setRandomAge();
  };

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
