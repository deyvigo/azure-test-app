import { Database } from 'sqlite3'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DATABASE_TEST
const dbPath = resolve(__dirname, './../../', dbName!)

export const db = new Database(dbPath)

db.serialize(() => {
  db.run(
    `
      CREATE TABLE IF NOT EXISTS user 
      (
        id_user INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(80) NOT NULL,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL
      );
    `
  )

  db.run(
    `
      CREATE TABLE IF NOT EXISTS post
      (
        id_post INTEGER PRIMARY KEY AUTOINCREMENT,
        description VARCHAR(30) NOT NULL,
        content TEXT NOT NULL,
        id_user INTEGER NOT NULL,
        CONSTRAINT post_user_id_user_fk
          FOREIGN KEY(id_user) REFERENCES user (id_user)
      );
    `
  )
})

export const deleteAllUsers = async () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION;', (err) => {
        if (err) {
          return reject(err)
        }

        db.run('DELETE FROM user;', (err) => {
          if (err) {
            return reject(err)
          }

          db.run('DELETE FROM sqlite_sequence WHERE name = "user";', (err) => {
            if (err) {
              return reject(err)
            }

            db.run('COMMIT;', (err) => {
              if (err) {
                reject(err)
              }
              resolve()
            })
          })
        })
      })
    })
  })
}

export const closeConnection = () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing connection', err)
    } else {
      console.log('Connection closed')
    }
  })
}