import { Property } from "../core/domain/Property";
import { PropertyType } from "../core/domain/PropertyType";
import { User } from "../core/domain/User";

export class Collection<T> {

  private items: T[] = [];
  private lastId = 1;

  save(item: T): Promise<T> {
    const id = (item as any).id;

    if (!id) {
      (item as any).id = this.lastId++;
      this.items.push(item);
    }

    const index = this.items.findIndex((item: any) => item.id === id);

    if (index >= 0) {
      this.items[index] = item;
    } else {
      this.items.push(item);
    }

    return Promise.resolve(item);
  }

  getById(id): Promise<T> {
    return Promise.resolve(
      this.items.find((item: any) => item.id === id)
    );
  }

  find(predicate: (item: T) => boolean): Promise<T[]> {
    return Promise.resolve(
      this.items.filter(predicate)
    );
  }

  findOne(predicate: (item: T) => boolean): Promise<T> {
    return Promise.resolve(
      this.items.find(predicate)
    );
  }

  delete(id: number): Promise<void> {
    const index = this.items.findIndex((item: any) => item.id === id);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    return Promise.resolve();
  }
}

export class DataSource {
  public readonly users = new Collection<User>;
  public readonly properties = new Collection<Property>;
  public readonly propertyTypes = new Collection<PropertyType>;

  private static _instance: DataSource;

  static get instance() {
    if (!DataSource._instance) {
      DataSource._instance = new DataSource();
    }

    return DataSource._instance;
  }
}
