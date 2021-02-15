const mongodb = require('mongodb').MongoClient;// requiring Mongo
const mongoUrl = "'mongodb://localhost:27017/'";
const dbName = 'portal';

class Queries {
    insertData = (data, callMeBack) => {
        mongodb.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            if (err) {
                console.log('Error in inserting data', err);
            } else {
                const collection = client.db(dbName).collection('user');
                collection.insertOne(data, {safe:true}, (err, result) => {
                    if (err) {
                        console.log('Error in Inserting data!');
                    } else {
                        callMeBack('Account created Successfully!');
                    }
                })
            }
        });
    }
    
    checkAlreadyExists = (data, callMeBack) => {
        mongodb.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            if (err) {
                console.log('Error in exists check!',err);
            } else {
                const collection = client.db(dbName).collection('user');
                collection.findOne({"email" : data.email}, {safe:true}).then ((result) => {
                    if (result) {
                        callMeBack(true, result);
                    } else {
                        callMeBack(false, null);
                    }
                })
            }
        });
    }

    getAdminPriviledgeData = (callMeBack) => {
        mongodb.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            if (err) {
                console.log('Error in exists check!',err);
            } else {
                const collection = client.db(dbName).collection('user');
                collection.find().toArray().then ((result) => {
                    callMeBack(result);
                })
            }
        });
    }
}
 
module.exports = new Queries();