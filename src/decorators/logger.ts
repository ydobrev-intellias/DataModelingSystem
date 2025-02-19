export default function logger(message: String) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log("[Logger]", message);
      return originalMethod.call(this, ...args);
    };

    return descriptor;
  };
}
