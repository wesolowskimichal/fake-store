import { Categories } from './core/components/categories/Categories'
import { Products } from './core/components/products/Products'
import { UserComponent } from './core/components/user/User'

export class Api {
  public static user = new UserComponent()
  public static products = new Products()
  public static categories = new Categories()
}
