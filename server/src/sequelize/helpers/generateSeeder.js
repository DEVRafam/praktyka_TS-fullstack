const bcrypt = require("bcrypt");
const fse = require("fs-extra");
const path = require("path");
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
            //
            // copy images
            //
            const { imagesTemplate, uploadDir } = options;
            if (imagesTemplate && uploadDir) {
                data.forEach((el) => {
                    // common seeder
                    if (options.user === undefined) {
                        const src = path.join(imagesTemplate, el.folder);
                        const dest = path.join(uploadDir, el.folder);
                        fse.copySync(src, dest);
                    }
                    // special for user
                    else {
                        if (!el.avatar) return;
                        const src = path.join(imagesTemplate, el.avatar);
                        const dest = path.join(uploadDir, el.avatar);
                        fse.copySync(src, dest);
                    }
                });
            }
            await Model.bulkCreate(data);
        },
        down: async () => {},
    };
};
