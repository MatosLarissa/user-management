import UserCreationDto from "../models/dto/userCreation.dto"
import UserUpdateDto from "../models/dto/userUpdate.dto"
import IUser from "./user.interface"

export default interface IUserRepository {
  create(user: UserCreationDto)
  getAllUsers();
  getUserById(userId: string)
  getUserByEmail(userEmail: string)
  getUserByEmailOrId(input: string)
  update(userToUpdate: IUser, userDetails: UserUpdateDto)
  delete(user: IUser): Promise<void>;
}
