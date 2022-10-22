const mongoose = require("mongoose");

// Connect to our MongoDB database, using the connection string
mongoose.connect(process.env.MONGODB_URI);
const mongooseClient = mongoose.connection;

// When the app connects to our MongoDB database 
mongooseClient.once('open', () => {
	console.log("MongoDB database successfully connected")
});

// If there's an error trying to connect with the database
mongooseClient.once('error', (error) => {
	console.log("There was an error trying to connect to MongoDB")
	console.log(error);
});

module.exports = { mongooseClient }