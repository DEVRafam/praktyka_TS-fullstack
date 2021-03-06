console.clear();
//
import app from "./app";
const { APP_PORT } = require("../src/config/config");
//
app.listen(APP_PORT, () => {
    console.log(`⚡ App is running at port ${APP_PORT} `);
});
