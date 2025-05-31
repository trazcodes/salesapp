const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Connected to MONGO"); })
    .catch((err) => { console.log("Connection Error" + err); })

module.exports = mongoose;

