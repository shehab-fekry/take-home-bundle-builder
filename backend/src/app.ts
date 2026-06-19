import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './middlewares/error-handler';

// create express app
const app = express();

// allowed origin
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// parse incoming data
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// routes...
app.get('/server-health', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', routes);

// errors handler middleware
app.use(errorHandler);

// server's port
const PORT = process.env.PORT || 8080;
// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
