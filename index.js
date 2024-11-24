import express from 'express'
import { sequelize } from './data/index.js'
import "./data/association.js"
import { userRouter } from './router/user.js'
import { postRouter } from './router/post.js'
import { authUserRouter } from './router/authUser.js'
import { errMiddle } from './middleware/error.js'
import { authMiddleware } from './middleware/auth.js'
import dotenv from 'dotenv'
import { commentRouter } from './router/comment.js'
import { roomRouter } from './router/room.js'
import http from 'http';
import { SocketManager } from './socketManager.js'
import fs from 'fs'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import { RootMutation, rootQuery } from './graphql/post.js'



dotenv.config()
const app = express()
const port = 3000

// Créer un serveur HTTP
const server = http.createServer(app);

const socketManager = new SocketManager(server);

// Creer la bdd avec les models, a exe quand il y a eu des modifs de model
//await sequelize.sync({ force: true });

//analyse body si body en json
app.use(express.json())

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: RootMutation
})
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

const swaggerFile = fs.readFileSync('./openapi.yaml', 'utf8');
const swaggerData = yaml.load(swaggerFile);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerData));

/* app.get('/', (req, res) => {
  res.send('Hello world !')
  }) */
app.use(express.static('client'));

app.use("/api/auth", authUserRouter);

app.use(authMiddleware);

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/room", roomRouter);

app.use(errMiddle);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})