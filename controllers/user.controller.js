/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const saltRound = 10;

// function pick(source, keys) {
//   return keys.reduce((result, key) => {
//     if (source.hasOwnProperty(key)) {
//       result[key] = source[key]
//     }
//     return result
//   }, {})
// }

const addUser = async (ctx) => {
  const {
    userName, userPassword, currLevel, currExp, completedActions,
  } = ctx.request.body;
  const hashedPassword = await bcrypt.hash(userPassword, saltRound);
  const user = await new User({
    userName,
    userPassword: hashedPassword,
    currLevel,
    currExp,
    completedActions,
  }).save();
  ctx.status = 201;
  ctx.body = user;
};

// update user
const updateUser = async (ctx) => {
  const user = await User.findByIdAndUpdate(
    { _id: ctx.request.body._id },
    ctx.request.body,
    { new: true },
  );
  // send back updated user
  ctx.status = 200;
  ctx.body = user;
};

// check if password is correct and if user exists
const checkUser = async (ctx) => {
  const basic = ctx.headers.authorization.split(' ');
  if (basic.length < 2 && basic[0] !== 'Basic') {
    throw new Error('Missing basic authentication header');
  }
  // decode base64
  const [username, password] = Buffer.from(basic[1], 'base64').toString('utf-8').split(':');

  const user = await User.findOne({ userName: username });
  // check if user exists and if password correct
  if (user) {
    const match = await bcrypt.compare(password, user.userPassword);
    if (match) {
      ctx.status = 200;
      ctx.body = JSON.stringify(user.userName);
      // Add session cookie
      ctx.session = { user };
    } else {
      ctx.status = 401;
      ctx.body = {
        fail: 'password',
      };
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      fail: 'username',
    };
  }
};

// load user with unique username
const getUser = async (ctx) => {
  const { username } = ctx.params;
  const user = await User.find({ userName: username });
  ctx.status = 200;
  ctx.body = user;
};

const getAllUsers = async (ctx) => {
  const users = await User.find({});
  ctx.status = 200;
  ctx.body = users;
};

module.exports = {
  addUser,
  updateUser,
  checkUser,
  getAllUsers,
  getUser,
};
