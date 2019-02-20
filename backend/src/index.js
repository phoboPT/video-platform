require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");
const createServer = require("./createServer");
const db = require("./db");
const cookieParser = require("cookie-parser");

const server = createServer();

//Use express middlware to handle cookies (JWT)
server.express.use(cookieParser());

//decode the jwt para obter o id pretendido

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
