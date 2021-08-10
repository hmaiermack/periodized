const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

//new mongodb-memory-server instance
const mongoServer = new MongoMemoryServer();

//connect to in memory db
exports.dbConnect = async () => {
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

//disconnect 
exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
