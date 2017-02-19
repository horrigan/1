const crypto = require('crypto');
const assert = require('assert');
const config = require('../../config');

module.exports = async (ctx, next) => {
  const db = await ctx.state.db;
  const docs = await db.collection(config.movieCollection).find({}).toArray();
  try {
    await db.close();
  } catch (e) {
    console.log(e)
  }

  await ctx.render('index', {
    answer: JSON.stringify(docs)
  })
};

