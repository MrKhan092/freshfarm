const mongoose = require("mongoose");
const Listing = require("../models/listing"); 
const sampleListings = require("./data"); 


const MONGO_URL = process.env.ATLASDB_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("DB Connection Error:", err));


async function insertSampleData() {
    try {
        await Listing.deleteMany({}); 
        await Listing.insertMany(sampleListings); 
        console.log("Sample data inserted successfully!");
    } catch (err) {
        console.error("Error inserting sample data:", err);
    } finally {
        mongoose.connection.close();
    }
}


insertSampleData();
