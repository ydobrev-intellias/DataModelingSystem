import { User } from "../entities";

class AuthService {
  private static instance: null | any;
  private user: null | User = null;
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    return AuthService.instance;
  }
  get getUserRole() {
    if (!this.user) {
      throw new Error("There is no session running currently.");
    }
    return this.user.role;
  }

  get getUser() {
    if (!this.user) {
      throw new Error("There is no session running currently.");
    }
    return this.user;
  }
  get isSessionRunning() {
    return !!this.user;
  }
  startSession(user: User) {
    if (this.user) {
      throw new Error("There is a session running currently.");
    }
    this.user = user;
  }
  closeSession() {
    this.user = null;
  }
}
export default AuthService;
