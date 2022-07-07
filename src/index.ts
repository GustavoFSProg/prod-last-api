import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import route from './routes'

dotenv.config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(route)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ msg: ` 🚮 Api running: ${PORT}` })
})

app.listen(PORT, () => {
  console.log(` 🚮 Api running: ${PORT}`)
})

export default app
