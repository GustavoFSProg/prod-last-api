import { PrismaClient } from '@prisma/client'
var cloudinary = require('cloudinary')

import dotenv from 'dotenv'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

var imagem = ''
var resultado = ''

dotenv.config()

async function register(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    const product = await prisma.products.create({
      data: {
        title: req.body.title,
        image: imagem,
        price: req.body.price,
        desc: req.body.desc,
      },
    })

    return res.status(201).send({ msg: 'Success!!!', product })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.products.findMany({
      orderBy: {
        createAt: 'desc',
      },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!' })
  }
}

async function deleteImage(req: Request, res: Response) {
  try {
    const data = await prisma.products.findFirst({
      where: { id: req.params.id },
    })

    if (!data) return res.status(400).send({ msg: 'Product not found!!' })

    await prisma.products.update({
      where: { id: req.params.id },
      data: {
        image: 'Image Deleted',
      },
    })

    return res.status(200).json({ msg: 'Image Deleted!!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!' })
  }
}

async function update(req: Request, res: Response) {
  try {
    await prisma.products.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        desc: req.body.desc,
      },
    })

    return res.status(200).json({ msg: 'EDITADO!!!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!' })
  }
}

async function deleter(req: Request, res: Response) {
  try {
    await prisma.products.delete({
      where: { id: req.params.id },
    })

    return res.status(200).json({ msg: 'DELETADO!!!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!' })
  }
}

export default { deleteImage, register, getAll, update, deleter }
