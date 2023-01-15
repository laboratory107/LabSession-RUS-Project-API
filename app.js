var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var normalizedPath = require("path").join(__dirname, "routes");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "RUS 22 API",
      version: "0.9.0",
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

require("fs").readdirSync(normalizedPath).forEach((file) => {
  const name = "/" + file.replace(".js", "");
  const route = require("./routes/" + file);

  app.use(name, route);
});

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


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
