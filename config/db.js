//require mongoose package
const mongoose = require('mongoose');
//require config package
const config = require('config');
//getting mongodb atlas uri
const db = config.get('mongoUri');


//connecting to mongodb atlas with the help of URI
const connectDb = async () => {
    try{
        await mongoose.connect(
            db,
            {
                useNewUrlParser:true,
                useCreateIndex: true ,
                useUnifiedTopology: true  
            }
        );

        console.log('MongoDb is connected');
    }catch(err){
        console.err(err.message);
        process.exit(1);
    }
};

//export 
module.exports =  connectDb;