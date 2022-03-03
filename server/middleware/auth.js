
const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/send-response');
const userModel = require('../models/users')
module.exports = async function (req, res, next) {
    try {
        const token = req.headers.authorization;

        const userDetails = await userModel.find({ auth: token });
        if (userDetails.length === 0) {
            sendResponse.sendJsonResponse(req, res, 403, {}, 'Authentication failed.', true)
        } else {
            const decode = jwt.verify(token, 'test');
            if (decode) {

                req.userData = userDetails[0];
                next();
            } else {
                sendResponse.sendJsonResponse(req, res, 403, {}, 'Authentication failed.', true)
            }
        }
    } catch (error) {
        sendResponse.sendJsonResponse(req, res, 403, {}, 'Authentication failed.', true)
    }
};