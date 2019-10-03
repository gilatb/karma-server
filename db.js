const mongoose = require('mongoose');

// mongoose.set('useFindAndModify', false);
// eslint-disable-next-line no-console

mongoose.connect('mongodb://mongo:27017/karma3db', { useNewUrlParser: true })
// eslint-disable-next-line no-console
  .then(() => console.log('MongoDB conection established!'))
// eslint-disable-next-line no-console
  .catch(err => console.log(err));
// .then(() => console.log(`Connected with ${process.env.MONGODB_URI}`))
// .catch(error => console.log(error)); // eslint-disable-line no-console


module.exports = mongoose;
