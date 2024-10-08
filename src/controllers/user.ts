import { Request, Response } from 'express'
import { UserCreateDto, UserUpdateDto } from '../dto/user'
import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user'

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    const { username, password, name, email }: UserCreateDto = req.body

    const dbUser = new UserRepository()

    // verify if username is already taken
    const userInDb = await dbUser.getByUsername(username)
    if (userInDb) {
      res.status(400).send({ message: 'Username already taken' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user: UserCreateDto = { username, password: hashedPassword, name, email }
    const response = await dbUser.insertOne(user)
    res.send(response)
  }

  static getAllUsers = async (req: Request, res: Response) => {
    const dbUser = new UserRepository()
    const response = await dbUser.getAll()
    res.send(response)
  }

  static getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params
    const dbUser = new UserRepository()
    const response = await dbUser.getByUsername(username)
    res.send(response)
  }

  static updateUser = async (req: Request, res: Response) => {
    const { username, name, email } = req.body
    const { id_user } = req.params

    const dbUser = new UserRepository()
    const userInDb = await dbUser.getById(id_user)
    if (!userInDb) {
      res.status(404).send({ message: 'User not found' })
      return
    }

    // verify if username is already taken
    const userTaken = await dbUser.getByUsername(username)
    if (userTaken) {
      res.status(400).send({ message: 'Username already taken' })
      return
    }

    const updatedUser: UserUpdateDto = {
      username: username || userInDb.username,
      name: name || userInDb.name,
      email: email || userInDb.email
    }

    const response = await dbUser.updateById(id_user, updatedUser)

    if (response.changes === 0) {
      res.status(500).send({ message: 'Failed to update user' })
    } else {
      res.send({ message: 'User updated successfully' })
    }
  }
}