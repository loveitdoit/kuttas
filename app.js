var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname.join() + '/public'));

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), () => {
  console.log('Express tarted on http://localhost:' +
    app.get('port') + ';press Ctrl - C to teminate.');
});
