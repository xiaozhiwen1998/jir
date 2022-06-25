//eslint-disable-next-line
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login')
    if (req.body.username === '123' && req.body.password === '123') {
      return res.status(200).json({ user: { token: '123', username: req.body.username } });
    } else {
      return res.status(403).json({ message: '密码错误' });
    }
  next();
};
