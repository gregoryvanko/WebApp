const APP_NAME = process.env.APP_NAME || "App Test"
const APP_PORT = process.env.APP_PORT || 9999
const App_ICON_PATH = process.env.App_ICON_PATH || "apple-icon-192x192.png"
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017"
const MONGO_DB_NAME = APP_NAME.replace(/ /g,"_")

// add list of routes
let ListOfRoute = []
ListOfRoute.push(require("./Express/Routes/Root"))
ListOfRoute.push(require("./Express/Routes/Post"))

// start app
const App = require("./App/startapp")
App.Start(APP_NAME, APP_PORT, __dirname + "/" + App_ICON_PATH, MONGO_URL, MONGO_DB_NAME, ListOfRoute)