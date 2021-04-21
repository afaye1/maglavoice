require('dotenv').config();
const prompt = require('prompt');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var parseString = require('xml2js').parseString;

// prompt.start();
// prompt.get(['calloutnumber', 'whattosay'], function (err, result) {
//     if (err) { return onErr(err); }
    // we have to convert the whattosay into xml and write it insite de <Say> tags
    var xml = '<Response><Say voice="woman" language="fr-FR">Chapeau!</Say><Say>You are the bestest</Say></Response>'
    var xml2 = 'Chapeau!'
    var xml3injson = { Response: { Say: [ { voice: 'woman', language: 'fr-FR' }, 'You are the bestest' ] } } 
    const target = { Say: xml2};
    const specs = { Say: xml2, '_': { voice: 'woman', language: 'fr-FR' } };
    // const returnedTarget = Object.assign(target, source);
    // console.log(target);
    // console.log(returnedTarget);
    parseString(xml, function (err, result) {
        console.log(result);
        console.log(result.Response.Say);
        // console.log(result.Response.Say[0]);
        // console.log(result.Response.Say[1]);
        newmessage = Object.assign(result.Response, specs);
        console.log(newmessage);
        // newmessage2 = Object.assign(result.Response, target, specs);
        // console.log(newmessage2);
    });

    // good job!
    // console.log('Calling ' + result.calloutnumber + '...' + 'we are going to tell that B: ' + result.whattosay);
    // client.calls
    //   .create({
    //     twiml: result.whattosay,
    //     // twiml: '<Response><Say>Ahoy, Mikinos!</Say></Response>',
    //     //  url: WEBSITE + '/test.xml',
    //      to: ('+1' + result.calloutnumber),
    //      from: PHONENUMBER
    //    })
    //   .then(call => console.log(call.sid));
// });

// function onErr(err) {
//     console.log(err);
//     return 1;
// }
