import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import moment from 'moment-timezone';
import { RegisterRoutes } from './routes';
import errorHandler from './middleware/errorHandler';
import swaggerDocument from './swagger.json';
import config from './config';
import initScheduledJobs from './lib/cron';

// init ioc container
import './ioc/index';

moment.tz.setDefault('Asia/Taipei');
const app = express();

// cron start
initScheduledJobs();

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

// API
RegisterRoutes(app);
if (config.env !== 'production') {
  swaggerUi.serveWithOptions({
    cacheControl: false,
  }),
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(errorHandler);

export default app;
