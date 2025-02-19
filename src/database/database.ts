import { cache, iterable } from "../decorators";
import { Entity, EntityKey } from "../types";

class Database<T extends { id: string }> {
  private cache: Map<string, Entity<T>>;
  private storage: Array<Entity<T>>;
  constructor(private classConstructor: new (...args: any) => T) {
    this.storage = new Array<Entity<T>>();
    this.cache = new Map<string, Entity<T>>();
  }

  @cache
  getOne(id: string) {
    if (this.storage.length === 0) {
      throw new Error("There is no such record to find in the database");
    }
    return this.storage.find((x) => x.id === id);
  }

  @cache
  getAll() {
    if (this.storage.length === 0) {
      throw new Error("There are no records to find in the database");
    }
    return this.storage;
  }
  @cache
  getAllByKey(key: EntityKey<T>, value: unknown) {
    const entities = this.storage.filter((x) => x[key] === value);
    if (!entities) {
      throw new Error(
        `There are no records with property ${key.toString()} with value ${value} to find in the database`
      );
    }
    return entities;
  }

  @iterable
  create(data: any) {
    const createdEntity = new this.classConstructor(...data);
    this.storage.push(createdEntity);
    this.cache.clear();
    return createdEntity;
  }

  delete(id: string) {
    const entity = this.storage.find((x) => x.id === id);
    if (!entity) {
      throw new Error("There is no such record to delete in the database");
    }

    this.storage = this.storage.filter((x) => x.id !== id);
    this.cache.clear();
  }

  update(id: string, data: Partial<Entity<T>>) {
    const entity = this.storage.find((x) => x.id === id);
    console.log(entity);
    if (!entity) {
      throw new Error("There is no such record to update in the database");
    }
    this.storage = this.storage.map((x) => {
      if (x.id === id) {
        return { ...x, ...data };
      }
      return x;
    });
    this.cache.clear();
  }
}
export default Database;
