import { mongoose } from '../utils/mongoose'
import configEnv from '../env'
import env from '../utils/env'

export default async function () {
  mongoose.set('debug', env.isDevelopment())
  mongoose.set('useFindAndModify', false);
  try {
    const options = {
      autoIndex: !!global.isIndexesServer
    }
    await mongoose.connect(configEnv.db, configEnv.dbOptions(options))
  } catch (error) {
    console.log('Error on connecting to db: ', error)
    console.log('\x1b[31m', '*** PLEASE CONNECT TO DATABASE BEFORE RUN SERVER', '\x1b[0m')
    process.exit(1)
  }
}
