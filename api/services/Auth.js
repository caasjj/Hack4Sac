var Promise = require('bluebird');
var crypto = Promise.promisifyAll(require('crypto'));


function _hash(pwd, salt) {

  var len = 128;
  var iterations = 12000;

  if (2 == arguments.length) {
    salt = Promise.resolve(salt);
  }
  else {
    salt = crypto.randomBytesAsync(len).then(function (bytes) {
      return bytes.toString('base64')
    });
  }

  return salt.then(salt => crypto.pbkdf2Async(pwd, salt, iterations, len))
    .then(hash => [salt, hash.toString('base64')])


}


module.exports = {

  hashPassword: function (pwd) {

    return _hash(pwd)
  },

  checkPassword: function (pwd, salt, storedHash) {

    return _hash(pwd, salt)
      .spread((salt, hash) => {
        return hash && storedHash && (hash == storedHash);
      })
  }


};
