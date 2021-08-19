const MongoClient = require('mongodb').MongoClient;
require('datejs')

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
function main(){

    const client = new MongoClient('mongodb://localhost:27017',{useUnifiedTopology:true});
    
    try {
        // Connect to the MongoDB cluster
        client.connect();
        let new_array = []
        let db = client.db('real-deal')
        db.collection('redirect', (err, collection) => {
            collection.find({}).toArray((err, items) => {
                if (err)
                    throw err;
                items.forEach(item =>{
                    let id = item['_id']
                    let d = new Date(item['created'])
                    const query = {'_id': id}
                    const update = {'created': d.toLocaleString()}
                    db.collection('redirect').updateOne({'_id': id},{$set: {'created': d.toLocaleString()}},{upsert:true})
                })
            })
        });
        new_array.forEach(item => {
            console.log(item)
        });        
        // Make the appropriate DB calls
        //await  listDatabases(client);
    } catch (e) {
        console.log(e);
    }
};

main()