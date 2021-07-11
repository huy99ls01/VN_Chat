import express from "express";
import ConnectDB from "./config/connectDB";
//import ContactModel from "./models/contact.model";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";

// Init app
let app = express();

// Connect to mongo
ConnectDB();

// Config view Engine
configViewEngine(app);

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