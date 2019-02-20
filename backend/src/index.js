require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
const cookieParser = require("cookie-parser");

const server = createServer();

//Use express middlware to handle cookies (JWT)
server.express.use(cookieParser());

//decode the jwt para obter o id pretendido

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);
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
