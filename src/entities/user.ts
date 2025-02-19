import { v4 as uuidv4 } from "uuid";
import { Roles } from "../types";

export default class User {
  public id: string;
  constructor(public name: string, public email: string, public role: Roles) {
    this.id = uuidv4();
  }
}
