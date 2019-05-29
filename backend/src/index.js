require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// Use express middlware to handle cookies (JWT)
server.express.use(cookieParser());

// decode the jwt para obter o id pretendido

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://www.paypalobjects.com/*',
  'http://someorigin.com',
  'http://anotherorigin.com',
  'http://localhost:7777',
  'https://q.stripe.com/*',
];
server.start(
  {
    cors: {
      allowedHeaders: ['sessionId', 'Content-Type'],
      exposedHeaders: ['sessionId'],
      origin: allowedOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      credentials: true,
      // origin(origin, callback) {
      //   // allow requests with no origin
      //   // (like mobile apps or curl requests)
      //   if (!origin) return callback(null, true);
      //   if (allowedOrigins.indexOf(origin) === -1) {
      //     const msg =
      //       'The CORS policy for this site does not ' +
      //       'allow access from the specified Origin.';
      //     return callback(new Error(msg), false);
      //   }
      //   return callback(null, true);
      // },
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
