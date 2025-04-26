const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_database_dev');
        console.log('Connected!!');
    } catch (error) {
        console.log('Conect Fail!!');
    }
}

module.exports = { connect };
