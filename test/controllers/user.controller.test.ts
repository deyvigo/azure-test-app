import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserRepository from '../../src/repositories/user'
import { UserController } from '../../src/controllers/user'
import { RunResult } from 'sqlite3'
import { UserDTO } from '../../src/dto/user'

jest.mock('../../src/repositories/user')
jest.mock('bcrypt')

const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('UserController create one tests', () => {
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

  it('should create a new user successfully', async () => {
    // Mock request data
    req.body = {
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'test@example.com'
    }

    // Mock repository behavior
    mockUserRepository.getByUsername.mockResolvedValue(undefined)  // Username not taken
    mockBcrypt.hash.mockResolvedValue('hashedpassword' as never)
    mockUserRepository.insertOne.mockResolvedValue({ lastID: 1, changes: 1 } as RunResult)

    await UserController.createUser(req as Request, res as Response)

    // Expect the repository methods to have been called
    expect(mockUserRepository.getByUsername).toHaveBeenCalledWith('testuser')
    expect(mockBcrypt.hash).toHaveBeenCalledWith('testpassword', 10)
    expect(mockUserRepository.insertOne).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'hashedpassword',
      name: 'Test User',
      email: 'test@example.com'
    })

    // Expect the response to be correct
    expect(res.send).toHaveBeenCalledWith({ lastID: 1, changes: 1 })
  })

  it('should return 400 if username is already taken', async () => {
    req.body = {
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'test@example.com'
    }

    // Mock repository to return a user (username already taken)
    mockUserRepository.getByUsername.mockResolvedValue({
      id_user: 1,
      username: 'testuser',
      password: 'hashedpassword',
      name: 'Existing User',
      email: 'existing@example.com'
    } as UserDTO)

    await UserController.createUser(req as Request, res as Response)

    // Expect 400 response
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: 'Username already taken' })
  })
})

describe('UserController get by username test', () => {
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

  it('should return user with same username passed', async () => {
    req.params = {
      username: 'testuser'
    }

    mockUserRepository.getByUsername.mockResolvedValue({
      id_user: 1,
      username: 'testuser',
      password: 'hashedpassword',
      name: 'Existing User',
      email: 'existing@example.com'
    } as UserDTO)

    await UserController.getUserByUsername(req as Request, res as Response)

    expect(res.send).toHaveBeenCalledWith({
      id_user: 1,
      username: 'testuser',
      password: 'hashedpassword',
      name: 'Existing User',
      email: 'existing@example.com'
    })
    expect(mockUserRepository.getByUsername).toHaveBeenCalledWith('testuser')
  })

  it('sum two numbers', async () => {
    const numberOne = 2
    const numberTwo = 3

    expect(numberOne + numberTwo).toBe(5)
  })
})