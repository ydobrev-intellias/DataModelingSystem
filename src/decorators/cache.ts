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
          `\n[Cache - Hit] ${key} query`,
          args ? `with key ${args.join(" - ")}` : null,
          "has been retrieved from cache."
        );
        return cacheValue;
      }

      cacheValue = originalMethod.call(this, ...args);
      console.log(
        `\n[Cache - Miss] ${key} query`,
        args ? `with key ${args.join(" - ")}\n` : null,
        "has been cached."
      );

      this.cache.set(cacheKey, cacheValue);

      return cacheValue;
    }
  };

  return descriptor;
}
