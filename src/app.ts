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

app.listen(4321, () => {
  console.log(`Server running on http://localhost:4321`)
})
