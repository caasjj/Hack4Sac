/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto')

module.exports = {

  login: function (req, res) {

    sails.models['user']

      .find({
          "username": req.body.username
      })

      .then( function(user) {
        return [user[0], sails.services['auth'].checkPassword(req.body.password, user[0].salt, user[0].hash)]
      })

      .spread( (user, checkPwd) => {

        if (checkPwd) {
          req.session.authenticatd = true
          //res.end('Login OK')
          res.json({
            token: sails.services['token'].issue({
              id: user.id
            })
          })
        }
        else {
          res.forbidden('BadLogin')
        }
      })

      .catch( function(err) {
        res.notFound(err)
      })


  },

  logout: function (req, res) {
    res.end('Logout OK')
  }


}
