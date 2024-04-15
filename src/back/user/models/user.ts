import IUser from "../interfaces/user.interface"

export default class User implements IUser {
  id: string;
  name: string;
  birthDate: Date;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;

  constructor(user: any) {
    this.id = user.id
    this.name = user.name
    this.birthDate = user.birthDate
    this.email = user.email
    this.password = user.password
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.lastLogin = user.lastLogin
  }
}
