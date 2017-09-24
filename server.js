// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

//const FaceApi = require('node-mscs-face')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json()); // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
var faceRec = express.Router();
var feeling = express.Router();


var objectname = "";
var text_for_analysis = "";
//

router.post('/', function(req, res) {

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe',
        qs: { maxCandidates: '1' },
        headers: {
            'postman-token': 'b0bcc72d-74ff-13ea-8112-5e260eec6208',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': '76512ba71da544ce832661ba41d7e46b',
            'content-type': 'application/octect-stream'
        },
        body: { req },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        objectname = body.description.captions[0].text;
        console.log(objectname);
        for (var i = 0; i < body.description.tags.length; i++) {
            text_for_analysis += body.description.tags[i] + " ";
        }
        console.log(text_for_analysis)

        res.json(objectname);
    });

});

faceRec.post('/', function(req, res) {

    // console.log("Hello");

    //console.log(req.body.url);

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
        qs: {
            visualFeatures: 'Categories,tags,faces,description',
            language: 'en'
        },
        headers: {
            'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/octect-stream',
            'ocp-apim-subscription-key': '60c7f169fbe24c12b5990a8916315bd7'
        },
        body: { req },
        json: true
    };

    // console.log(options.body)

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.json(body);
    });

});

feeling.post('/', function(req, res) {
    var request = require("request");
    var temp = "";
    console.log(req.body.documents[0].text);

    var options = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
        headers: {
            'postman-token': 'aafe0a3f-0a19-a84b-a296-d780744c526c',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': '5de69cdccacd4906ac1ff0f2100ac8a8',
            'content-type': 'application/json'
        },
        body: {
            documents: [{
                language: 'en',
                id: 'temp',
                text: req.body.documents[0].text
            }]
        },
        json: true
    };

    var options2 = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
        headers: {
            'postman-token': 'd6829747-3af4-446b-651b-9300c492269f',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '5de69cdccacd4906ac1ff0f2100ac8a8'
        },
        body: {
            documents: [{
                language: 'en',
                id: 'temp',
                text: req.body.documents[0].text
            }]
        },
        json: true
    };


    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        request(options2, function(error, response, body1) {
            if (error) throw new Error(error);
            temp += body1.documents[0].score;
            console.log(body1.documents[0].score);

        });

        console.log(body.documents[0].keyPhrases);
        temp += body.documents[0].keyPhrases;
        res.json(temp);
    });

});

app.use('/api', router);
app.use('/face', faceRec);
app.use('/text', feeling);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);