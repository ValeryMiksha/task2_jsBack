import express from 'express'
const app = express()
import cors from 'cors'
import GetController from "./src/controllers/dbConstructorControllers/GetController.js";
import PostController from "./src/controllers/dbConstructorControllers/PostController.js";
const jsonParser = express.json();
app.use(cors())
const dbConstructorRouter = express.Router()
//DBRequestConstructor requests
dbConstructorRouter.get('/getTables', GetController.getTableNames)
dbConstructorRouter.get('/getColumns/:tableName', GetController.getColumns)
dbConstructorRouter.post('/makeResultTable', jsonParser, PostController.makeResultTable)
app.use('/db-constructor', dbConstructorRouter)
app.listen(5000, (err) => {
  if(err) console.log(err)
  else console.log('Server running!')
})
