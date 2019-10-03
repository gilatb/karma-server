const Action = require('../models/action.model');

// load all actions
const getActions = async (ctx) => {
  const actions = await Action.find();
  ctx.status = 200;
  ctx.body = actions;
};

const addAction = async (ctx) => {
  const {
    description,
    expPoints,
    difficulty,
    category,
  } = ctx.request.body;
  const action = await new Action({
    description,
    expPoints,
    difficulty,
    category,
  }).save();
  ctx.status = 201;
  ctx.body = action;
};

module.exports = { getActions, addAction };
