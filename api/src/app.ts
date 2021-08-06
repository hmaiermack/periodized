import express from 'express'
require('dotenv').config()
import config from './config'
import log from './middleware/logger'
import connect from './db/connect'
import cors from 'cors'
import { healthCheck, userRouter } from './routes'
import { decodeIDToken } from './utils/authToken'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(decodeIDToken)

connect()
healthCheck(app)

app.use('/api/users', userRouter)

app.listen(config.port, () => {
    log.info(`Listening at port: ${config.port} on host: ${config.host}`)
})