import { AuthService } from "../services";
import { Roles } from "../types";

export default function roleGuard(...allowedRoles: Roles[]) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const authService = new AuthService();

      if (!authService.isSessionRunning) {
        throw new Error("[RoleGuard] No active session.");
      }

      const userRole = authService.getUserRole;
      const userId = authService.getUser.id;

      if (allowedRoles.includes(Roles.SELF) && args[0] === userId) {
        return originalMethod.apply(this, args);
      }

      if (!allowedRoles.includes(userRole)) {
        throw new Error("[RoleGuard] Session user does not have permission.");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
