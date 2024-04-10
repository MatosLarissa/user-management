export class User {
  constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private hierarchy: Level
  ) { }

  getId() {
    return this.id
  }
  getName() {
    return this.name
  }
  getEmail() {
    return this.email
  }
  getPassword() {
    return this.password
  }
  getHierarchy() {
    return this.hierarchy
  }

  setName(name: string) {
    this.name = name
  }
  setPassword(password: string) {
    this.password = password
  }
  setHierarchy(level: Level) {
    return this.hierarchy = level
  }

  static toUserModel(user: any): User {
    return new User(user.id, user.name, user.email, user.password, user.hierarchy)
  }
}

export type SignupInputDTO = {
    name: string;
    email: string;
    password: string;
    hierarchy: Level
}

export type UpdateUserInputDTO = {
    id: string;
    name: string;
    email: string;
    password: string;
    hierarchy: Level
}

export type LoginInputDTO = {
    email: string;
    password: string;
}

export enum Level {
    READER = "READER",
    LIMITED = "LIMITED",
    ADMIN = "ADMIN",
};