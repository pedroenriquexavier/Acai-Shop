


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception! Shuting down..');
    process.exit(1);
})


const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successul!');
});

const db = mongoose.connection;
 
const port =  process.env.PORT || 3000;
const server = app.listen(port, () => { 
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err =>  {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection! Shuting down..');
    server.close(() =>  { process.exit(1); })
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    server.close(() => {
        console.log('Process terminated.')
    })
})
