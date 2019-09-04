const dotenv = require('dotenv');
const validUrl = require('valid-url');
const shortid = require('shortid');

const client = require('../util/redis');

dotenv.config({ path: './config.env' });

const Url = require('../model/urlModel');

exports.getUrl = async (req, res) => {
  console.log('FETCHING DATA....');

  try {
    let url = await Url.findOne({
      urlCode: req.params.url
    });

    if (!url) {
      return res.status(404).json({ status: 'error', msg: 'No Url found' });
    }

    // Set Keys - Url Code and Count
    client.mset(url.urlCode, url.longUrl, `${url.urlCode}-count`, 0);

    res.redirect(url.longUrl);
  } catch (err) {
    console.error('ERROR', err);
    res.status(500).json({ err: err.msg });
  }
};

exports.postUrl = async (req, res, next) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.status(200).json({
          status: 'success',
          url
        });
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.status(201).json({
          status: 'success',
          url
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 'error',
        err
      });
    }
  } else {
    res.status(401).json('Invalid long url');
  }
};
