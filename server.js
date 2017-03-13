const express = require('express');

const app = express();

app.get('/', (req, res) => {
  let ipaddress = req.headers['x-forwarded-for'];
  let rawBrowser = req.headers['user-agent'];
  let rawLanguage = req.headers['accept-language'];

  let browser = browserify(rawBrowser);
  let language = langify(rawLanguage);

  function browserify(raw) {
    let openBracket = raw.indexOf('(') + 1;
    let closeBracket = raw.indexOf(')');

    return raw.substring(openBracket, closeBracket);
  };

  function langify(raw) {
    let comma = raw.indexOf(',');

    return raw.substring(0, comma);
  }


  res.send({
    ipaddress,
    browser,
    language
  })
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
})
