import express from "express";
import ConnectDB from "./config/connectDB";
//import ContactModel from "./models/contact.model";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

// Init app
let app = express();

// Connect to mongo
ConnectDB();

// Config session
configSession(app)

// Config view Engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true})) 

// Enable flash messages
app.use(connectFlash());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Hello, Running at ${ process.env.APP_HOST }:${ process.env.APP_PORT }/`);
});


/* 
app.get("/test-database", async (req, res) => {
    try { 
        let item = { 
            userId: "17021268",
            contactId: "123456",
        };
        let contact = await ContactModel.createNew(item)
        res.send(contact)
    }
    catch (err) { 
        console.log(err)
    }
    res.send("<h1>Hello !!!</h1>");
});
*/
