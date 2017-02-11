const crypto = require('crypto');
const assert = require('assert');

module.exports = async (ctx, next) => {
  const db = await ctx.state.db;
  const docs = await db.collection('hw1_2').find({}).toArray();
  try {
    await db.close();
  } catch (e) {
    console.log(e)
  }
  const algorithm = 'aes256';
  const encrypted_message = '7013254dca77e2c913d18cf5b70e7bba';
  const doc = docs[0];
  const decipher = crypto.createDecipher(algorithm, doc['_id']);
  const decrypted = decipher.update(encrypted_message, 'hex', 'utf8') + decipher.final('utf8');

  await ctx.render('index', {
    answer: decrypted
  })
};

