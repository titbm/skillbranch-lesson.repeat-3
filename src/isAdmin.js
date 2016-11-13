export default (request, response, next) => {
  if (request.headers.user === 'admin') {
    return next();
  }
  return next('access error');
};
