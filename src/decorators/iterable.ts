export default function iterable(
  _: any,
  __: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (args: any) {
    args[Symbol.iterator] = function* () {
      for (let key in this) {
        yield this[key];
      }
    };
    return originalMethod.call(this, args);
  };

  return descriptor;
}
