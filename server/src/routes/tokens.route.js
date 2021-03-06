/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const ValidationToken = require('../models/validation-token.model');
const restUtils = require('../user_modules/rest-utils');
const serializer = require('../user_modules/serializer');
const expressManager = require('../user_modules/express-manager');

const tokenService = require('../services/token.service');

const routeName = '/tokens';

let canView = (req, res, next) => {
  if (req.user.Type === 'ADMINISTRATOR')
    return next();

  return restUtils.rejectRequest();
};

router.get(`${routeName}/:token`, function(req, res, next) {
  ValidationToken.findOne({
    where: {
      Token: req.params.token
    }
  })
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

router.get(`${routeName}`, expressManager.loggedInGuard, canView, function(req, res, next) {
  tokenService.getAll()
    .then(serializer.serializeModels)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

/* CONSUME TOKEN */
router.post(`${routeName}/consume`, function(req, res, next) {
  ValidationToken.findOne({
    where: {
        Token: req.body.Token
    }
  })
    .then(token => {
        if (token === null)
            throw "Invalid token";
        return token;
    })
    .then((token) => tokenService.processToken(token, req.body))
    .then(serializer.serializeModel)
    .then(restUtils.prepareResponse)
    .then(payload => restUtils.sendResponse(payload, req, res))
    .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
