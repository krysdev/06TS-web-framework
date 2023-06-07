export class UserForm {
  // 'parent' is the existing element in the DOM where we can insert the 'template'
  // 'Element' is a reference to any HTML element
  constructor(public parent: Element) {}
  // constructor(public parent: Element) {}

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
      </div>
    `;
  }

  // show the HTML from the 'template' method in the DOM
  render(): void {
    const templateElement = document.createElement('template'); // create <template></template>
    templateElement.innerHTML = this.template(); // insert the HTML code between <template>this.template</template>
    this.parent.append(templateElement.content); // add the whole HTML and add it a parent element as a child
  }
}
