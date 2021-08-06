import mongoose from 'mongoose'
import log from '../middleware/logger'
import config from '../config'

function connect() {    
    return mongoose
        .connect(config.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            log.info('Database connected')
        })
        .catch((error) => {
            log.error("db error", error)
            process.exit(1)
        })
}

export default connect