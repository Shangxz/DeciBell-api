# node-mscs-face
A javascript wrapper for Microsoft Cognitive Services' Face API.

This module is not affiliated to Microsoft in any way.

## Easy to start using
This module is based off a wrapper wrote for Microsoft Cognitive Services' Face API duing a major school project.
It exposes the services provided by Face API into a set of functions that can be easily invoked in your Node.js project.

```js
// Require the module
const FaceApi = require('node-mscs-face');

// Pass in your Face API subscription key and your Face API's region to get started
var faceApi = new FaceApi('faceapi_subscription_key', 'region');
```

## Table of contents
- [Region](#region)
- [Detect](#detect)
- [Identify](#identify)
- [Add Face](#add-face)
- [Delete Face](#delete-face)
- [Create Person](#create-person)
- [Delete Person](#delete-person)
- [Train Person Group](#train-person-group)
- [Custom Implementations](#custom-implementations)
- [Things to Do](#things-to-do)

Services that are being wrapped for Face API are stated in the table of contents above, everything else is work in progress.
For Face API documentation, please refer to [Microsoft's Cognitive Services' Face API References](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236).

---

## Region
Currently, this module supports `West US (WUS)`, `East US 2 (EUS2)`, `West Central US (WCUS)`, `West Europe (WEU)`, `South East Asia (SEA)` as modelled after Cognitive Services' offerings. Pass in the respective region code as listed above to your Face API constructor to get started.

```js
// Pass in the region code to constructor
var faceApi = new FaceApi('faceapi_subscription_key', 'SEA'); // WUS, EUS2, WCUS, WEU & SEA are available
```

## Detect
The detect function takes in an image in a format suitable for an octet-stream and resolves an array of objects containing FaceIds and Face Rectangles of detected faces. If no faces are detected, an error will return.

```js
faceApi.detect(imageBuffer)
    .then((faceInfo) => {
        // Resolves faceInfo, an array
        faceInfo.forEach((detectedFace) => {
            // A single instance in faceInfo contains a faceId and faceRectangle
            console.log(faceInfo.faceId);
            console.log(faceInfo.faceRectangle);
        }, this);
    })
    .catch((err) => {
        // If no faces are detected, an error will be returned
        // An error can occur too if an incorrect/invalid Face API subscription key or any other incorrect parameters is provided. 
        // For more information on the kind of errors that Microsoft's Face API returns, please refer to https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236
        console.log(err);
    });
```

## Documentation will be subsequently updated.



