import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes/index'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' })
})

const server = app.listen(4321, () => {
  console.log(`Server running on http://localhost:4321`)
})

export const closeServer = () => {
  return new Promise<void>((resolve) => {
    server.close(() => {
      console.log('Server closed')
      resolve()
    })
  })
}

export default app
