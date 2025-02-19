import Database from "../database/database";
import { logger, roleGuard } from "../decorators";
import { Post } from "../entities";
import { Entity, Roles } from "../types";

class PostService {
  private db;
  constructor() {
    this.db = new Database(Post);
  }
  @logger("Creating post")
  @roleGuard(Roles.USER, Roles.ADMIN)
  createPost(data: Omit<Entity<Post>, "id">) {
    return this.db.create(data);
  }
  @logger("Fetching all posts for user")
  @roleGuard(Roles.SELF, Roles.ADMIN)
  getPostsForUser(userId: string) {
    return this.db.getAllByKey("userId", userId);
  }
  @logger("Deleting post")
  @roleGuard(Roles.ADMIN)
  deletePost(id: string) {
    return this.db.delete(id);
  }
}
export default PostService;
