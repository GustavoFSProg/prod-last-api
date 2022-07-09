import { Router } from 'express'
import productsController from './productsController'
import uploadConfig from './config/uploadConfig'
import multer from 'multer'
import userController from './userController'

const upload = multer(uploadConfig)

const route = Router()

route.get('/get-all', productsController.getAll)
route.post('/register', upload.single('image'), productsController.register)
route.put('/update/:id', productsController.update)
route.delete('/delete/:id', productsController.deleter)
route.delete('/delete-image/:id', productsController.deleteImage)

route.get('/get-users', userController.getAll)
route.post('/reg-user', userController.register)
route.post('/login', userController.login)

export default route
