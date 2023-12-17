var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GPT Daily Collector' });
});

// health
router.get('/health', function(req, res, next) {
  res.status(200).json('ok')
})

module.exports = router;
