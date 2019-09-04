const client = require('../util/redis');

exports.cache = (req, res, next) => {
  const { url } = req.params;

  // Get keys - Url Code and Count
  client.mget(url, `${url}-count`, (err, data) => {
    if (err) throw err;

    // data - ['urlcode', 'urlcount']
    if (data[0] !== null) {
      client.incr(`${url}-count`);

      client.get(url, (err, data) => {
        return res.redirect(data);
      });
    } else {
      next();
    }
  });
};
