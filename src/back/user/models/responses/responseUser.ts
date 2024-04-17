import LinkInterface from "../../../utils/responses/link.interface"
import IUser from "../../interfaces/user.interface"

export default class ResponseUser implements IUser {
  readonly id: string;
  readonly name: string;
  readonly birthDate: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastLogin: string;
  readonly user: IUser;
  readonly links: LinkInterface[];

  constructor(user: IUser, link: LinkInterface[]) {
    this.user = {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    }
    this.links = link
  }

  toResponse() {
    return {
      user: this.user,
      links: this.links,
    }
  }
}
