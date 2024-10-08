const mongoose = require('mongoose');

const MONGODBURI=process.env.MONGODBURI;

const connection = async () => {
    try {
        console.log(MONGODBURI);
        await mongoose.connect(MONGODBURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = connection;
