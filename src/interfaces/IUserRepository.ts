import { RunResult } from 'sqlite3'
import { UserCreateDto, UserDTO, UserUpdateDto } from '../dto/user'

export interface IUserRepository {
  insertOne: (user: UserCreateDto) => Promise<RunResult>
  getAll: () => Promise<any>
  getByUsername: (username: string) => Promise<UserDTO>
  getById: (id_user: string) => Promise<UserDTO>
  updateById: (id_user: string, user: UserUpdateDto) => Promise<RunResult>
}