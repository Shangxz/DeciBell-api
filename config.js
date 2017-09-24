// ADD THIS PART TO YOUR CODE
var config = {}

config.endpoint = "https://dbdb.documents.azure.com:443/";
config.primaryKey = "lB70aNLzb3K5jrSADjUSA3PGFHy9ikPhxepYguhyx7nh94xuEg0akt0f61LmoGsXUW43gzUrfiCcKLVHqIr8NQ==";

// ADD THIS PART TO YOUR CODE
config.database = {
    "id": "FaceInfoDB"
};

config.collection = {
    "id": "FaceCollDB"
};

config.documents = {
    "Andersen": {
        "id": "Anderson.1",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
            "firstName": "Mary Kay"
        }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    }
};

module.exports = config;