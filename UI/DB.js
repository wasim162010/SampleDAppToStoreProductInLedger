const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/EmployeeDB';
const client = new MongoClient(url);



async function connectDB() {
   
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }  
}

async function insertLocationDetail(_product_id, zipcode, currentAddr, locType) {

    await connectDB();
    var locRecord = { productID: _product_id, zip: zipcode, address: currentAddr, locationType: locType };

    if(checkCollectionExists("ItemTracker")) {

        db.collection(_product_id).insertOne(locRecord, function(err, res) {
            if (err) return err;
            else return "Record inserted";
            db.close();
          });

    } else {
        client.createCollection("ItemTracker", function(err, res) {
            if (err) {
                return  err;
            } 
            else{
                const db = client.db('SupplyChainTracker');
                db.collection(_product_id).insertOne(locRecord, function(err, res) {
                    if (err) return err;
                    else return "Record inserted";
                    db.close();
                  });
            }
            
        });
    }

}

async function checkCollectionExists(_collName) {
    
    await connectDB();
    const db = client.db('SupplyChainTracker');
    const exists = (await (await db.listCollections().toArray()).findIndex((item) => item.name === _collName) !== -1)
    return exists;

}

async function fetchAllEvents(_product_id) {

    const db = client.db('SupplyChainTracker');
    const _itemTracker = b.collection('ItemTracker').find({productID: _product_id});
    
    cursor.each(function(err, doc) { 
        return doc;

    });
}

async function fetchRecentEvent(prodID) {
    
    const db = client.db('SupplyChainTracker');

    db.collection('ItemTracker').findOne(
        {productID: _product_id},
        { sort: { _id: -1 } },
        (err, data) => {
           console.log(data);
           return data;
        },
      );

}