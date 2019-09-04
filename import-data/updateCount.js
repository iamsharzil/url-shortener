const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Url = require('../model/urlModel');
const client = require('../util/redis');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(console.log('DB successfull connection!'))
  .catch(err => {
    console.log(err);
  });

const updateData = () => {
  client.keys('*', (err, data) => {
    let urls = [];
    let urlCount = [];

    if (err) throw err;

    data.forEach(url => {
      if (url.endsWith('count')) {
        urlCount.push(url);
      } else {
        urls.push(url);
      }
    });

    urls.forEach(url => {
      client.get(`${url}-count`, (err, data) => {
        Url.updateMany(
          {
            urlCode: url
          },
          { $set: { clicks: data } },
          { multi: true },
          (err, result) => {
            console.log(result);
          }
        );
      });
    });
  });
};

if (process.argv[2] === '--import') {
  updateData();
}
