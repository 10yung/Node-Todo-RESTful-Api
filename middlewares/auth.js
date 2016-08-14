var express = require('express')
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');


module.exports = function(app) {
    return {
        requireAuth: function(req, res, next) {
            var token = req.get('auth');

            // decode token
            if (token) {

                // verifies secret and checks exp
                jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        req.username = req.decoded._doc.username;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }

        }
    }
}
