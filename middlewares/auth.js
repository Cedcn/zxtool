// 验证用户是否登录
exports.authUser = () => {
  return (req, res, next) => {
    // Ensure current_user always has defined.
    res.locals.current_user = null;
    if (req.session.user) {
      res.locals.current_user = req.session.user;
    }
    next();
  };
};
