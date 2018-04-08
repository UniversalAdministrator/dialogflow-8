"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
 
  console.log ('message from webhook1');

  var speech =  req.body.queryResult.parameters.echoText;
  console.log (speech);
    // req.body.result &&
    // req.body.result.parameters &&
    // req.body.result.parameters.echoText
    //   ? req.body.result.parameters.echoText
    //   : "Seems like some problem. Speak again.";
  return res.json({
    "speech": speech,
    "displayText": speech,
    "source": "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening", process.env.PORT);
});
