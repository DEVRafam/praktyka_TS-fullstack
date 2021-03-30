console.clear();
//
import app from "./app";
import { APP_PORT } from "./config/config";

//
app.listen(APP_PORT, () => {
    console.log(`⚡ App is running at port ${APP_PORT} `);
});
