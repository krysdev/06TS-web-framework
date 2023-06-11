import { Model, HasId } from '../models/Model';

// interface modelForView {
//   on(eventName: string, callback: () => void): void;
// }

// generic constraint
// 'View' has 2 type arguments and in the first argument there is a reference to the second one
// 'Model' itself is a generic class, so in order to provide a reference to it we need to provide a type for Model's T wich is K below
// so it says that 'T' has the same properties as 'Model with type K loaded into it'
// and the definition for 'Model<K>' comes from the second generic type passed in - K
export abstract class View<T extends Model<K>, K extends HasId> {
  // a region is a reference to a <div> element where the view is nested in UserEdit.ts
  // 'regions' object will be populated by the pairs from the 'regionsMap' i.e. ->  {userSHow:'.user-show', userForm:'.user-form'}
  regions: { [key: string]: Element } = {};

  // 'parent' is the existing element in the DOM where we can insert the 'template'
  // 'Element' is a reference to any HTML element
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  // initialize it here in case the child class doesn't need it, then it doesn't have to be initialized there
  // but it this empty object can always be overwritten by the child class
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

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

  // map through the 'regionsMap'
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key]; // value of the key is a selector of the element to insert into
      const element = fragment.querySelector(selector);
      // type guard
      if (element) {
        this.regions[key] = element; // populate the 'regions' with the pairs
      }
    }
  }

  // default implementation of the method; it can be overwritten in the child class
  onRender(): void {}

  // show the HTML from the 'template' method in the DOM
  render(): void {
    this.parent.innerHTML = ''; // delete and then render the HTML
    const templateElement = document.createElement('template'); // create <template></template>
    templateElement.innerHTML = this.template(); // insert the HTML code between <template>this.template</template>
    this.bindEvents(templateElement.content); // add an event to an element (process the eventsMap)
    this.mapRegions(templateElement.content); // helper method to map through all 'regions'
    this.onRender(); // nest the views (UserShow nad UserForm) in the "HTML fragment"
    this.parent.append(templateElement.content); // add the whole HTML into the parent element as a child
  }
}
