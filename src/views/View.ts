import { User } from './../models/User';
import { Model, HasId } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
  // 'parent' is the existing element in the DOM where we can insert the 'template'
  // 'Element' is a reference to any HTML element
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  // DocumentFragment holds some HTML in memory before it is attached to the DOM
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // split the key-value pair
      const [eventName, selector] = eventKey.split(':');

      // fragment is the HTML to be inserted
      // for every 'element' in the array that matches 'selector' we attach the event handler
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]); // addEventListener(click, button)
      });
    }
  }

  // show the HTML from the 'template' method in the DOM
  render(): void {
    this.parent.innerHTML = ''; // delete and then render the HTML
    const templateElement = document.createElement('template'); // create <template></template>
    templateElement.innerHTML = this.template(); // insert the HTML code between <template>this.template</template>
    this.bindEvents(templateElement.content); // add an event to an element (process the eventsMap)
    this.parent.append(templateElement.content); // add the whole HTML into the parent element as a child
  }
}
