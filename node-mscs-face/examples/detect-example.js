'use strict';

// Require FaceAPI module
const FaceApi = require('../index');

// Require other modules for this example
const config = require('./sampleData/sample-config');
const fs = require('fs');
const path = require('path');

// Instantiate Face API object
const face = new FaceApi(config.faceApi.key, config.faceApi.region);

// Read out contents of file synchronously
let img = fs.readFileSync(path.join(__dirname+ '/sampleData/img1.jpg'));

// Send image to Cognitive Services' Face API for detection
face.detect(img)
    .then((faceInfo) => {
        // Detect resolves a faceInfo object
        // Contains an array storing objects of faceId and face rectangle from cognitive services face API
        faceInfo.forEach((identified) => {
            console.log(`Identified faceId: ${identified.faceId} with face rectangle: ${identified.faceRectangle.top}, ${identified.faceRectangle.left}, ${identified.faceRectangle.width}, ${identified.faceRectangle.height}`);
        }, this);
    })
    .catch((err) => {
        // Detect could rejects with an error if no face is detected or if networking/cognitive services related issues occur
        console.log(`An error occurred with detect: ${err}`);
    });