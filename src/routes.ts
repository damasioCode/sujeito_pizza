import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import isAutenticated from './middlewares/isAutenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.get('/user', isAutenticated, new DetailUserController().handle);

router.post('/category', isAutenticated, new CreateCategoryController().handle);
router.post('/category', isAutenticated, new CreateCategoryController().handle);
router.get('/category', isAutenticated, new ListCategoryController().handle);

export { router };