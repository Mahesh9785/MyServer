const { response } = require('express');
const express=require('express');
const cors = require("cors");
const MongoClient=require('mongodb').MongoClient;

const app=express();
bodyParser = require("body-parser");

const uri = "mongodb://0.0.0.0:27017";
// Create a new MongoClient
const client = new MongoClient(uri);

const users = [];

    app.use(cors());
    
    app.use(bodyParser.json());
    
    app.get('/users', (req, res) => {

      async function run() {
        try {
          // Connect the client to the server (optional starting in v4.7)
          await client.connect();
          // Establish and verify connection
          await client.db("mydb");      
          
          const myDB = client.db("mydb");
          const myColl = myDB.collection("user");
      const findResult = myColl.find({"_id":1});
      
      console.log(findResult);
      res.send("Connected successfully to server");
      res.json(findResult.json);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
      
      
    });
    
    app.post('/user', (req, res) => {
              
        const user = req.body.user;
        
        users.push(user);

        
        
        
        console.log(users);
        async function run() {
          try {
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            // Establish and verify connection
            await client.db("mydb");      
            
            const myDB = client.db("mydb");
            const myColl = myDB.collection("user");
        const findResult = myColl.find({});
        await findResult.forEach(console.dir);
        await myColl.insertOne({
          "_id":1,"name":users.pop()
        })
        
        res.send("Connected successfully to server");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);

    res.json("user added");
    
  });
  
  app.get('/', (req,res) => {

    res.send('App Works !');

});

app.listen(3000, () => console.log('Server running on port 3000'));
