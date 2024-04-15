import { PrismaClient } from "@prisma/client"
import IUser from "./interfaces/user.interface"
import IUserRepository from "./interfaces/userRepository.interface"
import UserCreationDto from "./models/dto/userCreation.dto"
import UserUpdateDto from "./models/dto/userUpdate.dto"

export default class UserRepository implements IUserRepository{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(user: UserCreationDto) {
    return await this.prisma.user.create({ data: user })
  }

  async getAllUsers() {
    return await this.prisma.user.findMany()
  }

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({ where: { id: userId } })
  }

  async getUserByEmail(userEmail: string) {
    return await this.prisma.user.findUnique({ where: { email: userEmail } })
  }

  async getUserByEmailOrId(input: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: input },
          { id: input },
        ],
      },
    })
  }

  async update(userToUpdate: IUser, userDetails: UserUpdateDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userToUpdate.id },
      data: userDetails,
    })
    return updatedUser
  }

  async delete(user: IUser): Promise<void> {
    await this.prisma.user.delete({ where: { id: user.id } })
  }
}
