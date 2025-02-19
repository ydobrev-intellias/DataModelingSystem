type Entity<T extends { id: string }> = {
  [K in keyof T]: T[K];
};

export default Entity;
