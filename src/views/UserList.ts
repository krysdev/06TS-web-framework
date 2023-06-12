import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

// creates one view for every user fetched from the JSON server
export class UserList extends CollectionView<User, UserProps> {
  // take the model, generate a view of it, and render this view to the itemParent element (CollectionView.ts)
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
