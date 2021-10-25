import express from 'express'
require('dotenv').config()
import config from './config'
import log from './middleware/logger'
import connect from './db/connect'
import cors from 'cors'
import { healthCheck, userRouter, programRouter, trainingBlockRouter } from './routes'
import { decodeIDToken } from './utils/authToken'
import errorHandlerMiddleware from './middleware/errorHandler'
require('express-async-errors');



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
//all routes protected except for user registration
app.use(decodeIDToken.unless({ path: ['/users/register']}))

connect()
healthCheck(app)

app.use('/api/user', userRouter)
app.use('/api/programs', programRouter)
app.use('/api/trainingblocks', trainingBlockRouter)

app.use(errorHandlerMiddleware)

app.listen(config.port, () => {
    log.info(`Listening at port: ${config.port} on host: ${config.host}`)
})