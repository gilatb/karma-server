const db = require('../db');

const { Schema } = db;

const ActionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  expPoints: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = db.model('Action', ActionSchema);
