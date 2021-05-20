const path = require('path');

exports.index = (req, res) => {
  return res.render(path.resolve(__dirname, '..', 'views', 'index'));
}