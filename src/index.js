const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const fs = require("fs");
const environment = require("./environment");

const { mongoInfo, fileInfo } = environment;
const { fileName, fileFormat, locationToSave } = fileInfo;
const { uri, dbName, collectionName, query, projection, sort } = mongoInfo;

const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
    //assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    getDocuments(db, (docs) => {

        console.log('Closing connection.');
        client.close();

        try {
            fs.writeFileSync(`${locationToSave}/${fileName}${fileFormat}`, JSON.stringify(docs));
            console.log(`Done writing to file`);
        }
        catch (error) {
            console.log('Fail to writing\t', error);
        }
    });
});

const getDocuments = (db, callback) => {
    db.collection(collectionName)
        .find(query, { projection })
        .sort(sort)
        .toArray((err, result) => {
            if (err) throw err;
            callback(result);
        });
};
