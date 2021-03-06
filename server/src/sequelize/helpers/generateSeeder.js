const bcrypt = require("bcrypt");
//
module.exports = (Model, data, options = {}) => {
    //
    // hash all user's passwords
    //
    if (options.user === true) {
        data.map((item) => {
            item.password = bcrypt.hashSync(item.password, bcrypt.genSaltSync());
        });
    }
    //
    return {
        up: async () => {
            await Model.bulkCreate(data);
        },
        down: async () => {},
    };
};
