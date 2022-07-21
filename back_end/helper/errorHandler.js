const Error = {
  NO_TOKEN: 'No token provided',
  NOT_VALID_TOKEN: 'Token not valid',
  TOKEN_EXPIRED: 'Token expired',
};

// Error handling Middleware functions
const errorLogger = (error, _req, _res, next) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};

const errorResponder = (error, _req, res, _next) => {
  res.header('Content-Type', 'application/json');

  const status = error.status || 400;
  res.status(status).send(error.message);
};

const invalidPathHandler = (req, res, _next) => {
  res.status(400);
  res.send(`Invalid path, ${req.url} does not exists`);
};

export { Error, errorLogger, errorResponder, invalidPathHandler };
