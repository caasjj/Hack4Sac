'use strict';

var _ = require( 'lodash' )

/**
 * Policy to check that request is done via authenticated user. This policy uses existing
 * JWT tokens to validate that user is authenticated. If use is not authenticate policy
 * sends 401 response back to client.
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function ( request, response, next ) {

    sails.log.verbose( __filename + ':' + __line + ' [Policy.Authenticated() called]' )

    if (!request.token)  {
        return response.forbidden( 'Invalid authorization token' )
    }

    next()

}
