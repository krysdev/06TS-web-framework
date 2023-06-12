import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  // take the model, generate a view of it, and render this view to the itemParent element (used in UserList.ts)
  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    // iterate over every model the is fetched
    for (let model of this.collection.models) {
      const parentItem = document.createElement('div');
      this.renderItem(model, parentItem);
      templateElement.content.append(parentItem);
    }

    this.parent.append(templateElement.content);
  }
}
