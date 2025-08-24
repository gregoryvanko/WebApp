function Start(APP_NAME, APP_PORT, App_ICON_PATH, MONGO_URL, MONGO_DB_NAME, ListOfRoute){
    return new Promise(async(resolve) => {
        // Log start appliation
        console.log(`Starting application: ${APP_NAME}`)

        // Connect Mongo
        const Mongo = require("../Mongo/mongo")
        await Mongo.Connect(MONGO_URL, MONGO_DB_NAME)

        // Start of express
        const Express = require("../Express/express")
        await Express.StartServeur(APP_PORT, App_ICON_PATH, ListOfRoute)

        // Log appliation Started
        console.log(`Application Started`)
        resolve()
    })
}

module.exports.Start = Start