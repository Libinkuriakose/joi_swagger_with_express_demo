const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/test';
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const state = {client:null}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

exports.connect = async () => {
    
    try {
        // Connect to the MongoDB
        state.client = await client.connect();
        // Make the sample DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    }
}

//method for closing mongo connection
exports.close = async () => {
    await state.client.close()
    return true;
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => { return state.client.db() }