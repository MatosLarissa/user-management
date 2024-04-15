import LinkInterface from "../../../utils/responses/link.interface"
import IUser from "../../interfaces/user.interface"

export default class ResponseAllUser implements IUser {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly email: string;
  readonly password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastLogin: string;
  readonly users: IUser[];
  readonly links: LinkInterface[];
  readonly count: number;

  constructor(users: IUser[], link: LinkInterface[], count: number) {
    this.users = users.map((user) => ({
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    }))
    this.links = link
    this.count = count
  }

  toResponse() {
    return {
      users: this.users,
      links: this.links,
      count: this.count,
    }
  }
}
