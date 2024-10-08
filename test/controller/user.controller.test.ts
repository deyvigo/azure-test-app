import { Request, Response } from 'express'
import { UserController } from '../../src/controllers/user'
import UserRepository from '../../src/repositories/user'
import bcrypt from 'bcrypt'
import { UserDTO } from '../../src/dto/user'

jest.mock('../repositories/user')

const mockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>

describe('UserController Test', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    jest.clearAllMocks()

    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    }

    req = {
      body: {},
      params: {}
    }
  })

  it('should create a new user', async () => {
    req.body = {
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'test@example.com'
    }

    // mock simulating a database call
    mockUserRepository.prototype.getByUsername.mockResolvedValue(null)


  })
})