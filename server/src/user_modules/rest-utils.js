const ErrorModule = require('../error');
const AppError = ErrorModule.AppError;
const AppErrorTypes = ErrorModule.AppErrorTypes;
const User = require('../models/user.model');

module.exports = {};

/**
 * Prepares a response by wrapping the payload with any metadata about the response we need to know
 * @param payload - The actual data response
 * @param errors - An array of errors that occured
 * @returns {Promise}
 */
const prepareResponse = function(payload, errors=[]) {
  return new Promise((resolve, reject) => {
    resolve({
      Payload: payload,
      Errors: errors
    });
  });
};
module.exports.prepareResponse = prepareResponse;

const catchErrors = function(error, req, res) {
  return new Promise((resolve, reject) => {
    let message = "An internal server error occurred";

    if (error.message)
      message = error.message;
    else if (typeof error === "string")
      message = error;

    let status = 500;

    if (error.type !== AppErrorTypes.NOT_FOUND && error.type !== AppErrorTypes.MAP_NULL_INSTANCE)
      console.error(message);

    if (error.status !== undefined && error.status !== null)
      status = error.status;
    else
      switch (error.type) {
        case AppErrorTypes.MAP_NULL_INSTANCE:
        case AppErrorTypes.NOT_FOUND:
          status = 404;
          message = "Object not found";
          break;
      }

    res.status(status);

    prepareResponse({}, [message])
      .then(payload => sendResponse(payload, req, res))
      .then(resolve());
  })
};
module.exports.catchErrors = catchErrors;

const sendResponse = function(json, req, res) {
  return new Promise((resolve, reject) => {
    res.type('json');
    res.send(JSON.stringify(json));
    resolve();
  })
};
module.exports.sendResponse = sendResponse;

const authenticate = function(req) {
  return new Promise((resolve, reject) => {
    if (req.session.userId !== undefined && req.session.userId !== null) {
      let userId = req.session.userId;

      // Try to lookup the user, and return them
      User.findOne({
        where: {
          Id: userId
        }
      })
        .then(entity => {
          if (entity === null)
            reject("Authentication failure");

          resolve(entity);
        })
    }
    else {
      reject("Authentication failure");
    }
  })
};
module.exports.authenticate = authenticate;


const rejectRequest = (res) => {
  res.status(403);
  res.send();
};
module.exports.rejectRequest = rejectRequest;