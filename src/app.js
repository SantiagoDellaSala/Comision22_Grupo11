require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');

const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');
const transferLocals = require('./middlewares/transferLocals');
const cookieCheck = require('./middlewares/cookieCheck')

/* API's */
const productsApiRouter = require('./routes/api/products.routes');
const usersApiRouter = require('./routes/api/users.routes');

const app = express();

// view engine setup
app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

app
  .use(logger('dev'))
  .use(cookieParser())
  .use(methodOverride('_method'))

  /* Formularios */
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  /* Recursos estáticos */
  .use(express.static(path.join(__dirname, '..', 'public')))
  app.use(methodOverride('_method'))

  /* configuración de session */
  .use(session({
    secret : 'SUYDS',
    resave : true,
    saveUninitialized : true
  }))

  .use(cookieCheck)
  .use(transferLocals)

  /* Rutas */
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/products', productsRouter)

  /* API's */
  .use(productsApiRouter)
  .use(usersApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;