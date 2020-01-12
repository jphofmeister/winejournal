// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./cloud_keys_prod');
// } else {
//   module.exports = require('./cloud_keys_dev');
// }

// module.exports = {
//   cloud_name: 'hvc1lwmvp',
//   upload_preset: 'skbgk2wg'
// }

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  module.exports = require('./cloud_keys_dev');
} else {
  module.exports = require('./cloud_keys_prod');
}