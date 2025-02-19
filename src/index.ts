import { AuthService, PostService, UserService } from "./services";
import { Roles } from "./types";

function case1() {
  console.log("\n==== CASE 1: Create user, admin, and posts ====\n");
  const authService = new AuthService();
  try {
    const userService = new UserService();
    const postService = new PostService();

    const user = userService.createUser({
      email: "user@gmail.com",
      name: "User",
      role: Roles.USER,
    });

    const admin = userService.createUser({
      email: "admin@gmail.com",
      name: "Admin",
      role: Roles.ADMIN,
    });

    authService.startSession(admin); // Start session as admin

    const post = postService.createPost({
      content: "Some post",
      userId: user.id,
    });

    console.log("[Main] Post created:", post);
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case2() {
  console.log(
    "\n==== CASE 2: (Error) User should not be able to use admin operations ====\n"
  );
  const authService = new AuthService();

  try {
    const userService = new UserService();

    const user = userService.createUser({
      email: "user@gmail.com",
      name: "User",
      role: Roles.USER,
    });

    authService.startSession(user); // Start session as user

    userService.getAllUsers(); // Should throw an error since user is not admin
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case3() {
  console.log("\n==== CASE 3: Admin deleting a user ====\n");
  const authService = new AuthService();
  try {
    const userService = new UserService();

    const admin = userService.createUser({
      email: "admin@gmail.com",
      name: "Admin",
      role: Roles.ADMIN,
    });
    const user = userService.createUser({
      email: "user2@gmail.com",
      name: "User2",
      role: Roles.USER,
    });
    authService.startSession(admin); // Start session as admin
    userService.deleteUser(user.id);
    console.log("[Main] Remaining users", userService.getAllUsers());
    console.log("[Main] Remaining users from cache", userService.getAllUsers()); // From cache
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case4() {
  console.log(
    "\n==== CASE 4: (Error) User should not be able to delete another user ====\n"
  );
  const authService = new AuthService();
  try {
    const userService = new UserService();

    const user1 = userService.createUser({
      email: "user1@gmail.com",
      name: "User1",
      role: Roles.USER,
    });
    const user2 = userService.createUser({
      email: "user2@gmail.com",
      name: "User2",
      role: Roles.USER,
    });
    authService.startSession(user1); // Start session as user
    userService.deleteUser(user2.id); // Should throw an error since user is not admin
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case5() {
  console.log("\n==== CASE 5: Fetching posts for a user ====\n");
  const authService = new AuthService();
  try {
    const postService = new PostService();
    const userService = new UserService();
    const user = userService.createUser({
      email: "user@gmail.com",
      name: "User",
      role: Roles.USER,
    });

    authService.startSession(user); // Start session as user
    postService.createPost({ content: "First post", userId: user.id });
    postService.createPost({ content: "Second post", userId: user.id });

    const posts = postService.getPostsForUser(user.id);
    console.log("[Main] User posts:", posts);

    const cachedPosts = postService.getPostsForUser(user.id); // From cache
    console.log("[Main] User posts from cache:", cachedPosts);
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case6() {
  console.log("\n==== CASE 6: Admin deleting post of user ====\n");
  const authService = new AuthService();
  try {
    const postService = new PostService();
    const userService = new UserService();
    const user = userService.createUser({
      email: "user@gmail.com",
      name: "User",
      role: Roles.USER,
    });

    const admin = userService.createUser({
      email: "admin@gmail.com",
      name: "Admin",
      role: Roles.ADMIN,
    });

    authService.startSession(admin); // Start session as admin
    const post = postService.createPost({
      content: "First post",
      userId: user.id,
    });

    postService.deletePost(post.id);
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

function case7() {
  console.log(
    "\n==== CASE 7: (Error) User should not be able to delete posts ====\n"
  );
  const authService = new AuthService();
  try {
    const postService = new PostService();
    const userService = new UserService();
    const user = userService.createUser({
      email: "user@gmail.com",
      name: "User",
      role: Roles.USER,
    });

    authService.startSession(user); // Start session as user
    const post = postService.createPost({
      content: "First post",
      userId: user.id,
    });

    postService.deletePost(post.id); // Should throw an error since user is not admin
  } catch (e) {
    if (e instanceof Error) {
      console.log("[Error Handler]", e.message);
    }
  } finally {
    if (authService.isSessionRunning) {
      authService.closeSession();
    }
  }
}

async function runAllTests() {
  case1();
  case2();
  case3();
  case4();
  case5();
  case6();
  case7();
}

runAllTests();
