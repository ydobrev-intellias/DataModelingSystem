export default function cache(
  _: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const cacheKey = key + "," + args.join(",");
    let cacheValue;

    if ("cache" in this && this.cache instanceof Map) {
      cacheValue = this.cache.get(cacheKey);
      if (cacheValue) {
        console.log(
          args.length
            ? `[Cache - Hit] ${key} query with key ${args.join(
                " - "
              )} retrieved from cache.`
            : `[Cache - Hit] ${key} query retrieved from cache.`
        );
        return cacheValue;
      }

      cacheValue = originalMethod.call(this, ...args);
      console.log(
        args.length
          ? `[Cache - Miss] ${key} query with key ${args.join(
              " - "
            )} has been cached.`
          : `[Cache - Miss] ${key} query has been cached.`
      );

      this.cache.set(cacheKey, cacheValue);

      return cacheValue;
    }
  };

  return descriptor;
}
