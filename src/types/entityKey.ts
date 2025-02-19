import Entity from "./entity";

type EntityKey<T extends { id: string }> = keyof Entity<T>;

export default EntityKey;
