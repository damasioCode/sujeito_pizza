import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.listen(3000, () => {
    return console.log('Servidor online');
})