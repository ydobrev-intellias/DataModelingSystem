import Database from "../database/database";
import { cache, logger, roleGuard } from "../decorators";
import { User } from "../entities";
import { Entity, Roles } from "../types";

class UserService {
  private db;
  constructor() {
    this.db = new Database(User);
  }

  @logger("Fetching user")
  @roleGuard(Roles.ADMIN, Roles.SELF)
  getUser(id: string) {
    return this.db.getOne(id);
  }
  @logger("Fetching all users")
  @roleGuard(Roles.ADMIN)
  getAllUsers() {
    return this.db.getAll();
  }

  @logger("Creating user")
  createUser(data: Omit<Entity<User>, "id">) {
    return this.db.create(data);
  }

  @logger("Updating user")
  @roleGuard(Roles.ADMIN, Roles.SELF)
  updateUser(id: string, data: Partial<Entity<User>>) {
    this.db.update(id, data);
  }
  @logger("Deleting user")
  @roleGuard(Roles.ADMIN)
  deleteUser(id: string) {
    this.db.delete(id);
  }
}
export default UserService;
