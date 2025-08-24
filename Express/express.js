const express = require('express')
const MyServer = express()


function StartServeur(Port, IconPath = null, Routes = []){
    return new Promise(async(resolve) => {
        MyServer.use(express.json({limit: "200mb"}))

        // definition du path de l'icone
        let MyIconPath = (IconPath != null) ? IconPath : __dirname + "/apple-icon-192x192.png"
        console.log(`ÌconPath: ${MyIconPath}`)
        
        // Route pour icone
        MyServer.get('/apple-icon.png', (req, res) => {
            if(!SendIcon(MyIconPath, res)){console.error('Icon not found')}
        })
        MyServer.get('/apple-touch-icon.png', (req, res) => {
            if(!SendIcon(MyIconPath, res)){console.error('Icon not found')}
        })
        MyServer.get('/apple-touch-icon-precomposed.png', (req, res) => {
            if(!SendIcon(MyIconPath, res)){console.error('Icon not found')}
        })
        MyServer.get('/favicon.ico', (req, res) => {
            if(!SendIcon(MyIconPath, res)){console.error('Icon not found')}
        })

        // Ajouter les routes
        if (Routes.length != 0){
            Routes.forEach(element => {
                MyServer.use("/", element)
            });
        }
        
        // Route 404
        MyServer.use(function(req, res, next) {
            console.error(`Route not found ${req.originalUrl}`)
            res.status(404).send("Route not found: " + req.originalUrl);
        })

        // Start server
        MyServer.listen(Port, ()=>{
            console.log(`Server listening on *: ${Port}`)
            resolve()
        }).on('error', (error)=> {
            if (error.code == "EACCES"){console.error('Port is already in use')}
            process.exit(1)
        })

    })
}

function SendIcon(MyIconPath, res){
    let success = false
    var fs = require('fs')
    if(fs.existsSync(MyIconPath)){
        let IconFile = fs.readFileSync(MyIconPath)
        res.send(IconFile)
        success = true
    } else {
        res.status(404).send("Sorry, Icon not found")
    }
    return success
}

module.exports.StartServeur = StartServeur