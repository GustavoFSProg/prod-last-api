import { Router } from 'express'
import productsController from './productsController'
import uploadConfig from './config/uploadConfig'
import multer from 'multer'

const upload = multer(uploadConfig)

const route = Router()

route.get('/get-all', productsController.getAll)
route.post('/register', upload.single('image'), productsController.register)
route.put('/update/:id', productsController.update)
route.delete('/delete/:id', productsController.deleter)
route.delete('/delete-image/:id', productsController.deleteImage)

export default route
