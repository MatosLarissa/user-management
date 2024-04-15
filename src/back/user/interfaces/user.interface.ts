export default interface IUser {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly email: string;
  readonly password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastLogin: string;
}
