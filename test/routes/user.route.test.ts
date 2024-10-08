import app, { closeServer } from '../../src/app'
import request from 'supertest'
import { db, deleteAllUsers, closeConnection } from '../../src/database/connection'
import UserRepository from '../../src/repositories/user'

beforeEach(async () => {
  await deleteAllUsers()
})

afterAll(async () => {
  await closeConnection()
  await closeServer()
})

describe('User routes test', () => {
  it('should create a new user', async () => {
    const res = await request(app)
    .post('/user')
    .send({
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'test@example.com'
    })

    expect(res.status).toBe(200)
    const userInDb = await UserRepository.getByUsername('testuser')
    expect(userInDb).toBeDefined()
    expect(userInDb?.username).toBe('testuser')
  })
})