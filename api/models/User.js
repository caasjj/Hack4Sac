/**
 * User.js
 *
 * @description :: User model, typically an admin, who can modify the data store
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    /**
     * @param {string} email
     * @description primary email used for account confirmation email
     */
    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true
    },


    /**
     * @param {boolean} active
     * @description set to true on confirmation, may be set to false to disable an existing account
     */
    active: {
      type: 'boolean',
      defaultsTo: true
    },

    //******************** DEFAULT ***********************//
    /**
     * @param {string} username
     * @description username used by user to manage account
     */
    admin: {
      type: 'boolean',
      defaultsTo: false
    }

  },

  beforeCreate: function (data, cb) {
    console.log('Creating user ', data);
    sails.services['auth']
      .hashPassword(data.password)
      .spread((salt, hash) => {
        data.hash = hash;
        data.salt = salt;
        cb(null, data);
      })

  }
};

