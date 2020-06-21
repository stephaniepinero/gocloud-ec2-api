const express = require('express');
const indexRouter = require('./routes/index');
const landingRouter = require('./routes/landing');

const app = express();

app.use(express.json());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use('/', indexRouter);
app.use('/landing', landingRouter);

module.exports = app;