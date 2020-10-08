const middlewareFn = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = middlewareFn;
