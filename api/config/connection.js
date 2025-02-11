const mongoose = require('mongoose');

const connection = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/task");
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};
connection();