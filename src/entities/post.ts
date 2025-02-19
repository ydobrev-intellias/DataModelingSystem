import { v4 as uuidv4 } from "uuid";

export default class Post {
  public id: string;
  constructor(public content: string, public userId: string) {
    this.id = uuidv4();
  }
}
