// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");

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


var objectname = "";
//

router.post('/', function(req, res) {
    objectname = "";

    var options = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en&visualFeatures=tags&visualFeatures=faces&visualFeatures=description',
        headers: {
            'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '76512ba71da544ce832661ba41d7e46b'
        },
        body: { url: req.body },
        json: true
    };

    var options1 = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation =true',
        headers: {
            'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': 'e23daf60d538452c9360c5e95754135f'
        },
        body: { url: req.body },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        request(options1, function(error, response, body) {
            if (error) throw new Error(error);

            for (var k = 0; k < body.regions.length; k++) {
                var region = body.regions[k];
                for (var j = 0; j < region.lines.length; j++) {
                    var line = region.lines[j];
                    for (var i = 0; i < line.words.length; i++) {
                        var word = line.words[i].text;
                        objectname += " " + word;
                    }
                }
            }
            console.log(objectname);
            res.json(objectname);
        });
        objectname += body.categories[0].name;

    });
});

faceRec.post('/', function(req, res) {

    // console.log("Hello");

    console.log(req.body.url);

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
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '60c7f169fbe24c12b5990a8916315bd7'
        },
        body: { url: req.body.url },
        json: true
    };

    // console.log(options.body)

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.json(body);
    });

});

app.use('/api', router);
app.use('/face', faceRec);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);