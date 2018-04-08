"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var moment = require('moment');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
 
  console.log ('message from webhook1');

  var date =  req.body.queryResult.parameters.echoText;
	
  var apConfirmation = 'We have booked your appointment on ' + moment (date, 'Do MMM YYYY');
    // req.body.result &&
    // req.body.result.parameters &&
    // req.body.result.parameters.echoText
    //   ? req.body.result.parameters.echoText
    //   : "Seems like some problem. Speak again.";
    // response, context
  return res.json(
    {
      "fulfillmentText": apConfirmation,
      "source": "example.com",
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": apConfirmation
                }
              }
            ]
          }
        },
        "facebook": {
          "text": apConfirmation
        },
        "slack": {
          "text": apConfirmation
        },
        
  "outputContexts": [
    {
      "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
      "lifespanCount": 5,
      "parameters": {
        "param": "param value"
      }
    }
  ],
  "followupEventInput": {
    "name": "event name",
    "languageCode": "en-US",
    "parameters": {
      "param": "param value"
    }
  }
      }    
    }
  );
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening", process.env.PORT);
});
