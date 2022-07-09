import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from './token'

const prisma = new PrismaClient()

async function register(req: Request, res: Response) {
  try {
    const userio = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).send({ msg: 'Success!!!', userio })
  } catch (error) {
    return res.status(201).send({ msg: 'ERROR!!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function login(req: Request, res: Response) {
  try {
    const data = { email: req.body.email, password: req.body.password }
    const email = req.body.email

    const admin = await prisma.users.findFirst({
      where: {
        email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    if (!admin) return res.status(400).send({ msg: 'User not found!!' })

    const token = await generateToken(data)

    return res.status(200).send({ token })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

export default { register, login, getAll }
