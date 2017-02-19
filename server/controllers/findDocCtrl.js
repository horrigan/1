const crypto = require('crypto');
const assert = require('assert');
const config = require('../../config');

module.exports = async (ctx, next) => {
  const db = await ctx.state.db;
  const statement = {
    "imdb.votes": {
      $lt: 10000
    },
    "year": {
      $gte: 2010,
      $lte: 2013
    },
    "tomato.consensus": null
  };
  const updateStatement = {
    $unset: {"tomato.consensus": ""}
  };

  const docs = await db.collection(config.movieCollection).find(statement, updateStatement).count();
  try {
    await db.close();
  } catch (e) {
    console.log(e)
  }


  await ctx.render('findDoc', {
    answer: JSON.stringify(docs)
  })
};

