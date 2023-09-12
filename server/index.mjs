import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config.mjs';

import { api } from './router.mjs';

dotenv.config({ path: './.env' });

const app = express();

app.use(express.static(process.env.STATIC_DIR));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('req.originalUrl', req.originalUrl);
    next();
});

app.use('/api', api);
app.listen(config.port, () => console.log(`Node server listening on port ${config.port}!`));
