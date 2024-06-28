const asyncHandler = (funcHandler) => (req, res, next) =>
  Promise.resolve(funcHandler(req, res, next)).catch((err) => next(err));

module.exports = asyncHandler;
