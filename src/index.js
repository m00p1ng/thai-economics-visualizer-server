const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

function preprocess_data(field) {
  let new_field = JSON.parse(JSON.stringify(field))
  let m = []
  for(let i = 0; i < new_field.data.length; i++) {
    m.push(new_field.data[i].monthly)
  }
  let data_length = m[0].length

  let data_set = []
  for(let i = 0; i < data_length; i++) {
    let obj = {
      "date": m[0][i].year + "-" + leading_zero(m[0][i].month)
    }
    for(let j = 0; j < m.length; j++) {
      obj[new_field.fields[j]] = m[j][i].value
    }
    data_set.push(obj)
  }
  new_field.data = data_set
  return new_field
}

function leading_zero(n) {
  if(n < 10) {
    return "0" + n
  }
  return "" + n
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

app.get('/', function(req, res) {
  res.send('Hello World');
})

app.get('/exchange-rates', function(req, res) {
  var er = require('./data/exchange-rates');
  res.send(preprocess_data(er))
})

app.get('/unemployment', function(req, res) {
  const unemploy = require('./data/unemployment')
  res.send(preprocess_data(unemploy))
})

app.get('/export', function(req, res) {
  const export_data = require('./data/export')
  res.send(preprocess_data(export_data))
})

app.get('/employment', function(req, res) {
  const employ = require('./data/employment')
  res.send(preprocess_data(employ))
})

app.get('/private-investment-indicators', function(req, res) {
  const pii = require('./data/private-investment-indicators')
  res.send(preprocess_data(pii))
})

app.get('/consumer-confidence-index', function(req, res) {
  const cci = require('./data/consumer-confidence-index')
  res.send(preprocess_data(cii))
})

app.get('/business-sentiment-index', function(req, res) {
  const bsi = require('./data/business-sentiment-index')
  res.send(preprocess_data(bsi))
})

app.get('/private-consumption-indicators', function(req, res) {
  const pci = require('./data/private-consumption-indicators')
  res.send(preprocess_data(pci))
})

app.get('/import', function(req, res) {
  const import_data = require('./data/import')
  console.log(import_data)
  res.send(preprocess_data(import_data))
})