import { Router } from 'express'
import { UserController } from '../controllers/user'

const router = Router()

router.post('/', UserController.createUser)

router.get('/all', UserController.getAllUsers)

router.get('/:username', UserController.getUserByUsername)

router.put('/:id_user', UserController.updateUser)

export { router }