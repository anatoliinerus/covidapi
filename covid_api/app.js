import express from 'express';
import { dbConnect } from './dbconnect';
import stats from './routes/stats';

const app = express();

app.use(express.json());

app.use('/stats', stats);

app.use(function (req, res, next) {
  res.status(404).json({ error: '404 - wrong URL' });
});

app.listen(3000, console.log('Server running'));

dbConnect();
