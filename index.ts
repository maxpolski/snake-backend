process.env.NODE_ENV !== 'PROD' && require('dotenv').config();
import { app } from './src/app';

app.listen(process.env.PORT || 8888);
