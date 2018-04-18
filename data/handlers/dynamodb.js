"use strict"
var dynamoDbHelper = (function () {
    var AWS = require("aws-sdk");
    var config = require("../databaseConfig").dynamodb;
    AWS.config.update({
        region: config.region,
        endpoint: config.endpoint
    });

    var dynamodb = new AWS.DynamoDB.DocumentClient();

    var dynamodbOps = {
        scan: function (params, callback) {
            dynamodb.scan(params, onScan);

            function onScan(err, data) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Scan succeeded.");
                    // continue scanning if we have more places, because
                    // scan can retrieve a maximum of 1MB of data
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        dynamodb.scan(params, onScan);
                    }
                    if (data && data.Items)
                        callback(data.Items);
                    else
                        callback(null);
                }
            }
        },

        query: function (params, callback) {
            dynamodb.query(params, onQuery);

            function onQuery(err, data) {
                if (err) {
                    console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Query succeeded.");

                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Querying for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        dynamodb.query(params, onQuery);
                    }
                    if (data && data.Items)
                        callback(data.Items);
                    else
                        callback(null);
                }
            }
        },

        get: function (params, callback) {
            console.log("Getting " + JSON.stringify(params));
            dynamodb.get(params, function (err, data) {
                console.log(JSON.stringify(data));
                if (err) {
                    console.log(err, err.stack);
                    callback(null);
                }
                if (data && data.Item)
                    callback(data.Item);
                else
                    callback(null);
            });
        },
    };
    return {

        getStarterAnimals: function (data, callback) {
            var params = {
                TableName: config.tables.starters
            };
            dynamodbOps.scan(params, callback);
        },

        getAnimal: function (data, callback) {
            if (data && data.name && data.name.length > 0) {
                var params = {
                    TableName: config.tables.animals,
                    Key: {
                        name: data.name
                    }
                };
                dynamodbOps.get(params, callback);
            }
            else {
                callback(null);
            }
        },

        getRandomWildAnimals: function (data, callback) {
            console.log("In dynamo : " + JSON.stringify(data));
            if (data && data.levelThreshold !== undefined && data.region) {
                console.log("Inside dynamo : " + JSON.stringify(data));
                var params = {
                    TableName: config.tables.animals,
                    IndexName: config.indexes.randomWildAnimals,
                    KeyConditionExpression: "wildThresholdLvl = :levelThreshold ",
                    FilterExpression: "contains(regions, :region)",
                    ExpressionAttributeValues: {
                        ":levelThreshold": data.levelThreshold,
                        ":region": data.region
                    }
                };
                dynamodbOps.query(params, callback);
            }
            else {
                console.log("In dynamo null back " + JSON.stringify(data));
                callback(null);
            }

        }
    }
})();

module.exports = dynamoDbHelper;