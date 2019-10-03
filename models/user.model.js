const db = require('../db');

const { Schema } = db;

const UserSchema = Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  currLevel: {
    type: Number,
  },
  currExp: {
    type: Number,
  },
  completedActions: {
    type: Array,
  },
});

module.exports = db.model('User', UserSchema);
