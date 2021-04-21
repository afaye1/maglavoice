require('dotenv').config();
const prompt = require('prompt');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const xml2js = require('xml2js');
const express = require('express');

const app = express();
app.listen(5000, () => {
    console.log(
      'Now listening on port 3000. ' +
      'Be sure to restart when you make code changes!'
    );
  });

prompt.start();
prompt.get(['calloutnumber', 'whattosay'], function (err, result) {
    if (err) { return onErr(err); }
    // we have to convert the whattosay into xml and write it insite de <Say> tags
    const fs = require("fs");
    const whattosay2 = result.whattosay

    // read XML file
    fs.readFile("test.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
         // convert XML data to JSON object
    xml2js.parseString(data, (err, result) => {
        if (err) {
            throw err;
        }
        // edit the say tag
        result.Response.Say[2] = whattosay2;
        newcallmessage = JSON.stringify(result, null, 4);
        // console.log(newcallmessage);
        // convert SJON objec to XML
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        // write updated XML string to a file
        fs.writeFile('test2.xml', xml, (err) => {
           if (err) {
               throw err;
           }
   
           console.log(`Updated XML is written to a new file.`);
       });
    });

});

    // console.log('Calling ' + result.calloutnumber + '...' + 'we are going to tell that B: ' + result.whattosay);
    client.calls
      .create({
          // need to figure out a way to have it read any xml file i give it.
          // to be continued.
        // twiml: 'test.xml',
        // twiml: '<Response><Say>Ahoy, Mikinos!</Say></Response>',
        //  url: process.env.WEBSITE + '/test2.xml',
        // for some reason the url is broken when i use ngrok or local file path...something must be wrong.
         url: process.env.WEBSITE,
         to: ('+1' + result.calloutnumber),
         from: process.env.PHONENUMBER
       })
      .then(call => console.log(call.sid));
});

// function onErr(err) {
//     console.log(err);
//     return 1;
// }
