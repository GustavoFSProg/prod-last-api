// import { Response, Request } from 'express'

// var cloudinary = require('cloudinary')

// var imagem = ''
// var resultado = ''

// function uploadImage(req: Request, res: Response) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   })

//   cloudinary.uploader.upload(req.file.path, function (result, error) {
//     imagem = result.secure_url
//     resultado = result
//     console.log(resultado)
//   })
// }

// export default uploadImage
