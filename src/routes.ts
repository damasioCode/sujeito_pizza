import { Router } from 'express';
import multer from "multer";

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import isAutenticated from './middlewares/isAutenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/products/CreateProductController';

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.get('/user', isAutenticated, new DetailUserController().handle);

router.post('/category', isAutenticated, new CreateCategoryController().handle);
router.post('/category', isAutenticated, new CreateCategoryController().handle);
router.get('/category', isAutenticated, new ListCategoryController().handle);
router.post('/product', isAutenticated, upload.single('file'), new CreateProductController().handle)
export { router };