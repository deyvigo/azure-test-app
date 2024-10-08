import { readdirSync } from 'fs'
import { Router } from 'express'

const PATH_DIR = __dirname
const router = Router()

const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift()
}

readdirSync(PATH_DIR).forEach((file) => {
  const routeName = cleanFileName(file)
  if (routeName !== 'index') {
    import(`./${routeName}`).then((module) => {
      router.use(`/${routeName}`, module.router)
      console.log(`Route ${routeName} loaded`)
    }).catch(err => console.log(err))
  }
})

export { router }