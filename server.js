const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); 
const logger = require("morgan");
require('dotenv').config(); // stores environmental variables (.env), place .env at root of server folder
const path = require("path");
const connectDB = require("./configs/database"); //import database
connectDB(); //activate database

const app = express(); // activate express

app.use(logger("combined")); // login helper
app.use(cookieParser()); // activate cookies
app.use(express.json()); // alows req.body
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // client to server

app.use("/api/google/", require("./routes/google.route"));
app.use("/api/contact/", require("./routes/contact.route"));
app.use("/api/user/", require("./routes/user.route"));
app.use("/api/product/", require("./routes/product.route"));
app.use("/api/category/", require("./routes/category.route"));
app.use("/api/cart/", require("./routes/cart.route"));
app.use("/api/order/", require("./routes/order.route"));
app.use("/api/animal/", require("./routes/animal.route"));
app.use("/mailchimp/", require("./routes/newsletter.route"));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(process.env.PORT, () => 
    console.log(`Listening on port ${process.env.PORT}`)
)