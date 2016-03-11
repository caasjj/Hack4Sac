'use strict';

/**
 * Policy to verify a submitted jwt token
 *
 * This policy proceeds with next() with request.token set to 'undefined', even if the token is not verified.
 * That is, the decision to continue/stop based on lack of valid token is an authentication task done by
 * the authentication policy
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function ( request, response, next ) {

    sails.log.verbose( __filename + ':' + __line + ' [Policy.getToken() called]' )

    var authToken = sails.services['token'].getToken( request )

    if ( !authToken ) return next()

    // We delete the token from query and body to not mess with blueprints
    request.query && delete request.query.token
    request.body && delete request.body.token

    // Get and verify JWT via service
    sails

        .services['token']

        .verify( authToken, function verify ( error, token ) {

            if (error || !token) return next()

            // Store user id to request object
            request.token = token

            response.send(JSON.stringify({name:"JOBOB"}))
            next()

        } )

}
