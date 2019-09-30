const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
// eslint-disable-next-line no-console

const monk = require('monk');

// const db = monk(process.env.MONGODB_URL);

// mongoose.connect('mongo/karma', { useNewUrlParser: true })
//   .then(() => console.log(`Connected with ${process.env.MONGODB_URI}`)) // eslint-disable-line no-console
//   .catch(error => console.log(error)); // eslint-disable-line no-console


module.exports = mongoose;
