// client to initialise connection
const { MongoClient, ObjectID } = require("mongodb");

// define connection URL and databse we wanted to connect
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "planner";

const id = new ObjectID();
console.log(new Date(id.getTimestamp()));

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    // callbase function will be called when connection is done
    if (error) {
      return console.log("Connection Failed", error);
    }
    console.log("Connected Successfully");
    // get database reference
    const db = client.db(databaseName);

    db.collection("tasks")
      .updateMany(
        {
          completed: true,
        },
        {
          $set: {
            completed: false,
          },
        }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((err) => console.log(err));

    // db.collection('users').insertMany([{
    //     name: "Pritha Mukherjee",
    //     age: 26
    // },{
    //     name: "Sumit Mukherjee",
    //     age: 28
    // }], (err, result) => {
    //    if (err) return console.log('Unable to insert item')
    //    console.log(result.ops)
    // })

    // db.collection("tasks").insertMany([
    //   {
    //     description: "Complete mongodb tutorial",
    //     completed: false,
    //   },
    //   {
    //     description: "Work on Muzejs - feedback",
    //     completed: false,
    //   },
    //   {
    //     description: "Muze web EC2 to Lightsail",
    //     completed: true,
    //   },
    // ], (err, result) => {
    //     if(err) return console.log("Error in inserting data!!")
    //     console.log(result.ops);
    // });

    // db.collection('users').findone({
    //   name: 'Sumit'
    // }, (err, res) => {
    //   if(err) {
    //     console.log(err);
    //   }
    //   console.log(res)
    // })
    // db.collection("users")
    //   .find({
    //     age: 26,
    //   })
    //   .toArray((err, res) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(res);
    //   });

    // db.collection("tasks")
    //   .find({
    //     completed: false,
    //   })
    //   .count((err, res) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(res);
    //   })

    // .toArray((err, res) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(res);
    // });
  }
);
