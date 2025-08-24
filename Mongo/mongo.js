const mongoose = require('mongoose');

/**
 * connection to mongodb
 * @param {string} MONGO_URL mongodb url
 * @param {string} MONGO_DB_NAME mongodb name
 */
function Connect(MONGO_URL, MONGO_DB_NAME){
    return new Promise(async (resolve) => {
        mongoose.set("strictQuery", false)

        mongoose.connection.once("open", function() {
            console.log("MongoDB connected successfully")
        })
        mongoose.connection.on('error', (error) => {
            console.log('Mongo Connection Error: '+ error)
            process.exit(1)
        })
        mongoose.connection.on('connected', async()=>{
            console.log('MongoDb Connection Established')
        })
        mongoose.connection.on('reconnected', async()=>{
            console.log('MongoDB Connection Reestablished')
        })
        mongoose.connection.on('disconnected',()=>{
            console.log('MongoDB Connection Disconnected')
            console.log('Trying to reconnect to Mongo...')
            setTimeout(()=>{
                mongoose.connect(url,{serverselectiontimeoutms: 3000})
            }, 3000)
        })
        mongoose.connection.on('close',() =>{
            console.log('Mongo Connection Closed')
        });

        

        await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, {serverSelectionTimeoutMS: 3000})
        .catch((error) => {
            console.error('mongoose connection error: ' + error)
            process.exit(1)
        })
        resolve()
    })
}

module.exports.Connect = Connect