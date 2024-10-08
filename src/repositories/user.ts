import { db } from '../database/connection'
import { RunResult } from 'sqlite3'
import { UserCreateDto, UserDTO, UserUpdateDto } from '../dto/user'

export default class UserRepository {
  static insertOne = async (user: UserCreateDto) => {
    const query = 'INSERT INTO user (username, password, name, email) VALUES (?, ?, ?, ?);'
    return new Promise<RunResult>((resolve, reject) => {
      db.run(
        query,
        [user.username, user.password, user.name, user.email],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(this)
          }
        }
      )
    })
  }

  static getAll = async () => {
    const query = 'SELECT * FROM user;'
    return new Promise<UserDTO[]>((resolve, reject) => {
      db.all(
        query,
        [],
        function (err, rows: UserDTO[]) {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        }
      )
    })
  }

  static getByUsername = async (username: string) => {
    const query = 'SELECT * FROM user WHERE username = ?;'
    return new Promise<UserDTO | undefined>((resolve, reject) => {
      db.get(
        query,
        [username],
        function (err, row: UserDTO) {
          if (err) {
            reject(err)
          } else {
            resolve(row)
          }
        }
      )
    })
  }

  static getById = async (id_user: string) => {
    const query = 'SELECT * FROM user WHERE id_user = ?;'
    return new Promise<UserDTO>((resolve, reject) => {
      db.get(
        query,
        [id_user],
        function (err, row: UserDTO) {
          if (err) {
            reject(err)
          } else {
            resolve(row)
          }
        }
      )
    })
  }

  static updateById = async (id_user: string, user: UserUpdateDto) => {
    const query = 'UPDATE user SET username = ?, name = ?, email = ? WHERE id_user = ?;'
    return new Promise<RunResult>((resolve, reject) => {
      db.run(
        query,
        [user.username, user.name, user.email, id_user],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(this)
          }
        }
      )
    })
  }
}