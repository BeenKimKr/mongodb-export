/**
 * uri: mongoDB uri
 * format: .json or .txt
 * locationToSave: 
 */

const mongoInfo = {
    uri: "",
    dbName: "",
    collectionName: "",
    query: {},
    projection: {},
    sort: {},
};

const fileInfo = {
    fileName: "test1",
    fileFormat: ".txt",
    locationToSave: "/Users/beenkim/Desktop",
};

module.exports = { mongoInfo, fileInfo };
