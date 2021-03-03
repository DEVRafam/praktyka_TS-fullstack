const path = require("path");
const bcrypt = require("bcrypt");
module.exports = {
    up: async () => {
        const User = require(path.join(__dirname, "..", "models", "User"));
        // hash password
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash("qwertyjebacgorzen", salt);
        //
        await User.create({
            name: "Kacper",
            surname: "Ksiazek",
            email: "jebac_gorzen@gmail.com",
            password,
        });
    },

    down: async () => {},
};
